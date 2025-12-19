import {
  FeesWithdrawn as FeesWithdrawnEvent,
  MarketplaceSet as MarketplaceSetEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Paused as PausedEvent,
  Unpaused as UnpausedEvent,
  WhitelistAdded as WhitelistAddedEvent,
  WhitelistFeeSet as WhitelistFeeSetEvent,
} from "../generated/WhitelistManager/WhitelistManager"
import {
  FeesWithdrawn,
  MarketplaceSet,
  WhitelistManagerOwnershipTransferred,
  WhitelistManagerPaused,
  WhitelistManagerUnpaused,
  WhitelistAdded,
  WhitelistFeeSet,
} from "../generated/schema"

export function handleFeesWithdrawn(event: FeesWithdrawnEvent): void {
  let entity = new FeesWithdrawn(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.to = event.params.to
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMarketplaceSet(event: MarketplaceSetEvent): void {
  let entity = new MarketplaceSet(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.marketplace = event.params.marketplace

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent,
): void {
  let entity = new WhitelistManagerOwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePaused(event: PausedEvent): void {
  let entity = new WhitelistManagerPaused(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new WhitelistManagerUnpaused(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWhitelistAdded(event: WhitelistAddedEvent): void {
  let entity = new WhitelistAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.nftContract = event.params.nftContract
  entity.platformFeeRate = event.params.platformFeeRate
  entity.payer = event.params.payer
  entity.fee = event.params.fee

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWhitelistFeeSet(event: WhitelistFeeSetEvent): void {
  let entity = new WhitelistFeeSet(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.fee = event.params.fee

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
