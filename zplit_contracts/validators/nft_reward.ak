use aiken/cbor
use aiken/collection/list
use aiken/crypto
use aiken/primitive/bytearray
use cardano/address.{Script}
use cardano/assets.{PolicyId}
use cardano/transaction.{InlineDatum, OutputReference, Transaction}
use utils/value
use zplit/action.{Action, Mint}
use zplit/cip68.{Cip68, must_consume_nonce, must_send_ref_token_to_self_script}

validator zplit_nft_reward {
  mint(redeemer action: Action, policy_id: PolicyId, tx: Transaction) {
    // Only the Mint action is allowed
    when action is {
      Mint(nonce_utxo) -> {
        // Calculate token name from the nonce UTXO
        let token_name = nonce_utxo |> cbor.serialise |> crypto.blake2b_224

        // Get all minted tokens
        let mint_pairs = tx.mint |> value.to_pairs(policy_id)
        let mint_count = list.length(mint_pairs)
        // Must mint either 2 or 3 tokens (with optional metadata)
        expect mint_count == 2 || mint_count == 3
        // Extract ref and user tokens, which are mandatory
        expect Some(ref_token) =
          mint_pairs
            |> list.find(
                fn(pair) {
                  let Pair(name, _) = pair
                  bytearray.take(name, 4) == #"000643b0"
                },
              )
        expect Some(usr_token) =
          mint_pairs
            |> list.find(
                fn(pair) {
                  let Pair(name, _) = pair
                  bytearray.take(name, 4) == #"000de140"
                },
              )
        // Validate ref token
        let Pair(ref_token_name, ref_token_qty) = ref_token
        expect ref_token_qty == 1
        let ref_name_suffix = bytearray.drop(ref_token_name, 4)
        expect ref_name_suffix == token_name
        // Validate user token
        let Pair(usr_token_name, usr_token_qty) = usr_token
        expect usr_token_qty == 1
        let usr_name_suffix = bytearray.drop(usr_token_name, 4)
        expect usr_name_suffix == token_name
        // Check metadata token if present
        let has_valid_metadata =
          when
            list.find(
              mint_pairs,
              fn(pair) {
                let Pair(name, _) = pair
                bytearray.take(name, 4) == #"000de141"
              },
            )
          is {
            Some(Pair(metadata_name, metadata_qty)) ->
              // Metadata token must have quantity of 1 and same name suffix
              metadata_qty == 1 && bytearray.drop(metadata_name, 4) == token_name
            None -> True
          }
        // Metadata token is optional
        // Additional validations
        and {
          has_valid_metadata,
          // Consume the nonce UTXO to prevent replay attacks
          must_consume_nonce(tx.inputs, nonce_utxo),
          // Ensure ref token goes to script address for immutability
          must_send_ref_token_to_self_script(
            tx.outputs,
            policy_id,
            ref_token_name,
          ),
        }
      }
    }
  }

  spend(
    _datum: Option<Cip68>,
    redeemer action: Action,
    _o_ref: OutputReference,
    _tx: Transaction,
  ) {
    // Spending is always prohibited - makes tokens permanently locked
    // This prevents users from burning or updating the NFTs
    False
  }

  else(_) {
    fail
  }
}
