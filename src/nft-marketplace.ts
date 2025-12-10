import {
  EmergencyWithdrawAll as EmergencyWithdrawAllEvent,
  NFTDeposited as NFTDepositedEvent,
  NFTRemovedFromWhitelist as NFTRemovedFromWhitelistEvent,
  NFTSold as NFTSoldEvent,
  NFTWhitelisted as NFTWhitelistedEvent,
  NFTWithdrawn as NFTWithdrawnEvent,
  OrderStatusUpdated as OrderStatusUpdatedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Paused as PausedEvent,
  PriceSet as PriceSetEvent,
  Unpaused as UnpausedEvent,
  WhitelistManagerSet as WhitelistManagerSetEvent
} from "../generated/NFTMarketplace/NFTMarketplace"
import {
  EmergencyWithdrawAll,
  NFTDeposited,
  NFTRemovedFromWhitelist,
  NFTSold,
  NFTWhitelisted,
  NFTWithdrawn,
  OrderStatusUpdated,
  OwnershipTransferred,
  Paused,
  PriceSet,
  Unpaused,
  WhitelistManagerSet
} from "../generated/schema"

export function handleEmergencyWithdrawAll(
  event: EmergencyWithdrawAllEvent
): void {
  let entity = new EmergencyWithdrawAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.totalWithdrawn = event.params.totalWithdrawn

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNFTDeposited(event: NFTDepositedEvent): void {
  let entity = new NFTDeposited(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.nftContract = event.params.nftContract
  entity.tokenId = event.params.tokenId
  entity.depositor = event.params.depositor
  entity.price = event.params.price
  entity.orderId = event.params.orderId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNFTRemovedFromWhitelist(
  event: NFTRemovedFromWhitelistEvent
): void {
  let entity = new NFTRemovedFromWhitelist(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.nftContract = event.params.nftContract

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNFTSold(event: NFTSoldEvent): void {
  let entity = new NFTSold(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.nftContract = event.params.nftContract
  entity.tokenId = event.params.tokenId
  entity.seller = event.params.seller
  entity.buyer = event.params.buyer
  entity.price = event.params.price
  entity.platformFee = event.params.platformFee
  entity.sellerAmount = event.params.sellerAmount
  entity.orderId = event.params.orderId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNFTWhitelisted(event: NFTWhitelistedEvent): void {
  let entity = new NFTWhitelisted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.nftContract = event.params.nftContract
  entity.platformFeeRate = event.params.platformFeeRate

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNFTWithdrawn(event: NFTWithdrawnEvent): void {
  let entity = new NFTWithdrawn(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.nftContract = event.params.nftContract
  entity.tokenId = event.params.tokenId
  entity.depositor = event.params.depositor
  entity.orderId = event.params.orderId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOrderStatusUpdated(event: OrderStatusUpdatedEvent): void {
  let entity = new OrderStatusUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.orderId = event.params.orderId
  entity.status = event.params.status

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePaused(event: PausedEvent): void {
  let entity = new Paused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePriceSet(event: PriceSetEvent): void {
  let entity = new PriceSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.nftContract = event.params.nftContract
  entity.tokenId = event.params.tokenId
  entity.price = event.params.price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new Unpaused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWhitelistManagerSet(
  event: WhitelistManagerSetEvent
): void {
  let entity = new WhitelistManagerSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.manager = event.params.manager

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
