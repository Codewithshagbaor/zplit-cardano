use cardano/transaction.{OutputReference}

pub type Action {
  Mint(NonceUTxO)
}

type NonceUTxO =
  OutputReference

type UsrTokenInputIdx =
  Int
