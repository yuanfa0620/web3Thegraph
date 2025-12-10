import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  FeesWithdrawn,
  MarketplaceSet,
  OwnershipTransferred,
  WhitelistAdded,
  WhitelistFeeSet
} from "../generated/WhitelistManager/WhitelistManager"

export function createFeesWithdrawnEvent(
  to: Address,
  amount: BigInt
): FeesWithdrawn {
  let feesWithdrawnEvent = changetype<FeesWithdrawn>(newMockEvent())

  feesWithdrawnEvent.parameters = new Array()

  feesWithdrawnEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  feesWithdrawnEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return feesWithdrawnEvent
}

export function createMarketplaceSetEvent(
  marketplace: Address
): MarketplaceSet {
  let marketplaceSetEvent = changetype<MarketplaceSet>(newMockEvent())

  marketplaceSetEvent.parameters = new Array()

  marketplaceSetEvent.parameters.push(
    new ethereum.EventParam(
      "marketplace",
      ethereum.Value.fromAddress(marketplace)
    )
  )

  return marketplaceSetEvent
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

export function createWhitelistAddedEvent(
  nftContract: Address,
  platformFeeRate: BigInt,
  payer: Address,
  fee: BigInt
): WhitelistAdded {
  let whitelistAddedEvent = changetype<WhitelistAdded>(newMockEvent())

  whitelistAddedEvent.parameters = new Array()

  whitelistAddedEvent.parameters.push(
    new ethereum.EventParam(
      "nftContract",
      ethereum.Value.fromAddress(nftContract)
    )
  )
  whitelistAddedEvent.parameters.push(
    new ethereum.EventParam(
      "platformFeeRate",
      ethereum.Value.fromUnsignedBigInt(platformFeeRate)
    )
  )
  whitelistAddedEvent.parameters.push(
    new ethereum.EventParam("payer", ethereum.Value.fromAddress(payer))
  )
  whitelistAddedEvent.parameters.push(
    new ethereum.EventParam("fee", ethereum.Value.fromUnsignedBigInt(fee))
  )

  return whitelistAddedEvent
}

export function createWhitelistFeeSetEvent(fee: BigInt): WhitelistFeeSet {
  let whitelistFeeSetEvent = changetype<WhitelistFeeSet>(newMockEvent())

  whitelistFeeSetEvent.parameters = new Array()

  whitelistFeeSetEvent.parameters.push(
    new ethereum.EventParam("fee", ethereum.Value.fromUnsignedBigInt(fee))
  )

  return whitelistFeeSetEvent
}
