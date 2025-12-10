import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
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
} from "../generated/NFTMarketplace/NFTMarketplace"

export function createEmergencyWithdrawAllEvent(
  totalWithdrawn: BigInt
): EmergencyWithdrawAll {
  let emergencyWithdrawAllEvent =
    changetype<EmergencyWithdrawAll>(newMockEvent())

  emergencyWithdrawAllEvent.parameters = new Array()

  emergencyWithdrawAllEvent.parameters.push(
    new ethereum.EventParam(
      "totalWithdrawn",
      ethereum.Value.fromUnsignedBigInt(totalWithdrawn)
    )
  )

  return emergencyWithdrawAllEvent
}

export function createNFTDepositedEvent(
  nftContract: Address,
  tokenId: BigInt,
  depositor: Address,
  price: BigInt,
  orderId: BigInt
): NFTDeposited {
  let nftDepositedEvent = changetype<NFTDeposited>(newMockEvent())

  nftDepositedEvent.parameters = new Array()

  nftDepositedEvent.parameters.push(
    new ethereum.EventParam(
      "nftContract",
      ethereum.Value.fromAddress(nftContract)
    )
  )
  nftDepositedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  nftDepositedEvent.parameters.push(
    new ethereum.EventParam("depositor", ethereum.Value.fromAddress(depositor))
  )
  nftDepositedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  nftDepositedEvent.parameters.push(
    new ethereum.EventParam(
      "orderId",
      ethereum.Value.fromUnsignedBigInt(orderId)
    )
  )

  return nftDepositedEvent
}

export function createNFTRemovedFromWhitelistEvent(
  nftContract: Address
): NFTRemovedFromWhitelist {
  let nftRemovedFromWhitelistEvent =
    changetype<NFTRemovedFromWhitelist>(newMockEvent())

  nftRemovedFromWhitelistEvent.parameters = new Array()

  nftRemovedFromWhitelistEvent.parameters.push(
    new ethereum.EventParam(
      "nftContract",
      ethereum.Value.fromAddress(nftContract)
    )
  )

  return nftRemovedFromWhitelistEvent
}

export function createNFTSoldEvent(
  nftContract: Address,
  tokenId: BigInt,
  seller: Address,
  buyer: Address,
  price: BigInt,
  platformFee: BigInt,
  sellerAmount: BigInt,
  orderId: BigInt
): NFTSold {
  let nftSoldEvent = changetype<NFTSold>(newMockEvent())

  nftSoldEvent.parameters = new Array()

  nftSoldEvent.parameters.push(
    new ethereum.EventParam(
      "nftContract",
      ethereum.Value.fromAddress(nftContract)
    )
  )
  nftSoldEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  nftSoldEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  nftSoldEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  nftSoldEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  nftSoldEvent.parameters.push(
    new ethereum.EventParam(
      "platformFee",
      ethereum.Value.fromUnsignedBigInt(platformFee)
    )
  )
  nftSoldEvent.parameters.push(
    new ethereum.EventParam(
      "sellerAmount",
      ethereum.Value.fromUnsignedBigInt(sellerAmount)
    )
  )
  nftSoldEvent.parameters.push(
    new ethereum.EventParam(
      "orderId",
      ethereum.Value.fromUnsignedBigInt(orderId)
    )
  )

  return nftSoldEvent
}

export function createNFTWhitelistedEvent(
  nftContract: Address,
  platformFeeRate: BigInt
): NFTWhitelisted {
  let nftWhitelistedEvent = changetype<NFTWhitelisted>(newMockEvent())

  nftWhitelistedEvent.parameters = new Array()

  nftWhitelistedEvent.parameters.push(
    new ethereum.EventParam(
      "nftContract",
      ethereum.Value.fromAddress(nftContract)
    )
  )
  nftWhitelistedEvent.parameters.push(
    new ethereum.EventParam(
      "platformFeeRate",
      ethereum.Value.fromUnsignedBigInt(platformFeeRate)
    )
  )

  return nftWhitelistedEvent
}

export function createNFTWithdrawnEvent(
  nftContract: Address,
  tokenId: BigInt,
  depositor: Address,
  orderId: BigInt
): NFTWithdrawn {
  let nftWithdrawnEvent = changetype<NFTWithdrawn>(newMockEvent())

  nftWithdrawnEvent.parameters = new Array()

  nftWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "nftContract",
      ethereum.Value.fromAddress(nftContract)
    )
  )
  nftWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  nftWithdrawnEvent.parameters.push(
    new ethereum.EventParam("depositor", ethereum.Value.fromAddress(depositor))
  )
  nftWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "orderId",
      ethereum.Value.fromUnsignedBigInt(orderId)
    )
  )

  return nftWithdrawnEvent
}

export function createOrderStatusUpdatedEvent(
  orderId: BigInt,
  status: i32
): OrderStatusUpdated {
  let orderStatusUpdatedEvent = changetype<OrderStatusUpdated>(newMockEvent())

  orderStatusUpdatedEvent.parameters = new Array()

  orderStatusUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "orderId",
      ethereum.Value.fromUnsignedBigInt(orderId)
    )
  )
  orderStatusUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "status",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(status))
    )
  )

  return orderStatusUpdatedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent =
    changetype<OwnershipTransferred>(newMockEvent())

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPausedEvent(account: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  pausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return pausedEvent
}

export function createPriceSetEvent(
  nftContract: Address,
  tokenId: BigInt,
  price: BigInt
): PriceSet {
  let priceSetEvent = changetype<PriceSet>(newMockEvent())

  priceSetEvent.parameters = new Array()

  priceSetEvent.parameters.push(
    new ethereum.EventParam(
      "nftContract",
      ethereum.Value.fromAddress(nftContract)
    )
  )
  priceSetEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  priceSetEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return priceSetEvent
}

export function createUnpausedEvent(account: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  unpausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return unpausedEvent
}

export function createWhitelistManagerSetEvent(
  manager: Address
): WhitelistManagerSet {
  let whitelistManagerSetEvent = changetype<WhitelistManagerSet>(newMockEvent())

  whitelistManagerSetEvent.parameters = new Array()

  whitelistManagerSetEvent.parameters.push(
    new ethereum.EventParam("manager", ethereum.Value.fromAddress(manager))
  )

  return whitelistManagerSetEvent
}
