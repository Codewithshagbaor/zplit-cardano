# Smart Contract Documentation: `zplit_nft_reward`

## Overview

The `zplit_nft_reward` validator is designed to manage the minting and locking of NFTs on the Cardano blockchain. It ensures strict rules for minting, prohibits burning or updating NFTs, and enforces immutability by locking tokens to a script address.

This contract is implemented in Aiken, a domain-specific language for writing Plutus smart contracts.

---

## Functionalities

### 1. **Minting NFTs**
The `mint` function governs the minting process. It enforces the following rules:
- **Allowed Action**: Only the `Mint` action is permitted.
- **Token Name Calculation**: The token name is derived from the nonce UTXO using the `blake2b_224` hash of its serialized CBOR representation.
- **Minting Rules**:
  - Exactly 2 or 3 tokens must be minted:
    - **Reference Token** (`ref_token`): Identified by the prefix `000643b0`.
    - **User Token** (`usr_token`): Identified by the prefix `000de140`.
    - **Metadata Token** (optional): Identified by the prefix `000de141`.
  - Each token must have a quantity of `1`.
  - The suffix of the token names must match the calculated token name.
- **Replay Protection**: The nonce UTXO must be consumed to prevent replay attacks.
- **Immutability**: The reference token must be sent to the script address.

#### Code Highlights:
```aiken
// Validate ref token
expect ref_token_qty == 1
expect ref_name_suffix == token_name

// Validate user token
expect usr_token_qty == 1
expect usr_name_suffix == token_name

// Metadata token validation
metadata_qty == 1 && bytearray.drop(metadata_name, 4) == token_name
```

---

### 2. **Spending NFTs**
The `spend` function prohibits spending of tokens, ensuring that minted NFTs remain permanently locked. This prevents users from burning or updating the NFTs.

#### Code Highlights:
```aiken
spend(
  _datum: Option<Cip68>,
  redeemer action: Action,
  _o_ref: OutputReference,
  _tx: Transaction,
) {
  False
}
```

---

### 3. **Fallback Behavior**
The `else` clause ensures that any invalid or unsupported actions result in a failure.

#### Code Highlights:
```aiken
else(_) {
  fail
}
```

---

## Key Dependencies

The contract relies on several utility functions and modules:
- **`must_consume_nonce`**: Ensures the nonce UTXO is consumed to prevent replay attacks.
- **`must_send_ref_token_to_self_script`**: Validates that the reference token is sent to the script address for immutability.
- **`value.to_pairs`**: Extracts token pairs from the transaction's mint field.

---

## Acknowledgments

This contract was inspired by and built upon the work of [https://github.com/apcs-25/cardano_sandbox_25/](https://github.com/apcs-25/cardano_sandbox_25/). Special thanks to the author for their guidance and for providing a foundational script that served as a boilerplate for this implementation.

---

## Usage Instructions

### Building
To compile the contract, run:
```sh
aiken build
```

### Testing
Write tests using the `test` keyword in Aiken. Run all tests with:
```sh
aiken check
```

### DOc
To generate doc
```sh
aiken docs
```