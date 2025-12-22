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
  WhitelistManagerSet,
  WhitelistedNFT,
  Order,
  ActiveOrder,
  SoldOrder
} from "../generated/schema"
import { NFTMarketplace } from "../generated/NFTMarketplace/NFTMarketplace"
import { store } from "@graphprotocol/graph-ts"

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
  // 保存事件实体
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

  // 创建或更新 Order 实体
  let orderId = event.params.orderId
  let orderIdString = orderId.toString()
  let order = Order.load(orderIdString)
  
  if (order == null) {
    order = new Order(orderIdString)
  }
  
  order.orderId = orderId
  order.nftContract = event.params.nftContract
  order.tokenId = event.params.tokenId
  order.depositor = event.params.depositor
  order.price = event.params.price
  order.createdAt = event.block.timestamp
  order.createdBlockNumber = event.block.number
  order.createdTransactionHash = event.transaction.hash
  order.updatedAt = event.block.timestamp
  order.updatedBlockNumber = event.block.number

  // 尝试从合约获取订单详情
  let marketplaceContract = NFTMarketplace.bind(event.address)
  let orderResult = marketplaceContract.try_getOrderById(orderId)
  if (!orderResult.reverted) {
    let orderInfo = orderResult.value
    order.status = orderInfo.status
    order.updatedAt = orderInfo.updatedAt
  } else {
    // 如果无法获取，默认状态为 0 (Listed)
    order.status = 0
  }

  order.save()

  // 创建 ActiveOrder 实体（未出售的订单）
  let activeOrder = new ActiveOrder(orderIdString)
  activeOrder.orderId = orderId
  activeOrder.nftContract = event.params.nftContract
  activeOrder.tokenId = event.params.tokenId
  activeOrder.depositor = event.params.depositor
  activeOrder.price = event.params.price
  activeOrder.status = order.status
  activeOrder.createdAt = event.block.timestamp
  activeOrder.createdBlockNumber = event.block.number
  activeOrder.createdTransactionHash = event.transaction.hash
  activeOrder.updatedAt = event.block.timestamp
  activeOrder.updatedBlockNumber = event.block.number
  activeOrder.save()
}

export function handleNFTRemovedFromWhitelist(
  event: NFTRemovedFromWhitelistEvent
): void {
  // 保存事件实体
  let entity = new NFTRemovedFromWhitelist(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.nftContract = event.params.nftContract

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  // 更新 WhitelistedNFT 实体，标记为无效
  let nftContractAddress = event.params.nftContract
  let whitelistedNFT = WhitelistedNFT.load(nftContractAddress)
  
  if (whitelistedNFT != null) {
    whitelistedNFT.isActive = false
    whitelistedNFT.removedAt = event.block.timestamp
    whitelistedNFT.removedBlockNumber = event.block.number
    whitelistedNFT.save()
  }
}

export function handleNFTSold(event: NFTSoldEvent): void {
  // 保存事件实体
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

  // 更新 Order 实体
  let orderId = event.params.orderId
  let orderIdString = orderId.toString()
  let order = Order.load(orderIdString)
  
  if (order != null) {
    order.buyer = event.params.buyer
    order.price = event.params.price
    order.platformFee = event.params.platformFee
    order.sellerAmount = event.params.sellerAmount
    order.status = 2 // Sold 状态
    order.soldAt = event.block.timestamp
    order.soldBlockNumber = event.block.number
    order.soldTransactionHash = event.transaction.hash
    order.updatedAt = event.block.timestamp
    order.updatedBlockNumber = event.block.number
    order.save()
  }

  // 删除 ActiveOrder 实体（订单已售出）
  let activeOrder = ActiveOrder.load(orderIdString)
  if (activeOrder != null) {
    store.remove("ActiveOrder", orderIdString)
  }

  // 创建 SoldOrder 实体（已出售的订单）
  let soldOrder = new SoldOrder(orderIdString)
  soldOrder.orderId = event.params.orderId
  soldOrder.nftContract = event.params.nftContract
  soldOrder.tokenId = event.params.tokenId
  soldOrder.depositor = event.params.seller
  soldOrder.buyer = event.params.buyer
  soldOrder.price = event.params.price
  soldOrder.platformFee = event.params.platformFee
  soldOrder.sellerAmount = event.params.sellerAmount
  
  // 尝试从 Order 实体获取创建信息
  if (order != null) {
    soldOrder.createdAt = order.createdAt
    soldOrder.createdBlockNumber = order.createdBlockNumber
    soldOrder.createdTransactionHash = order.createdTransactionHash
  } else {
    soldOrder.createdAt = event.block.timestamp
    soldOrder.createdBlockNumber = event.block.number
    soldOrder.createdTransactionHash = event.transaction.hash
  }
  
  soldOrder.soldAt = event.block.timestamp
  soldOrder.soldBlockNumber = event.block.number
  soldOrder.soldTransactionHash = event.transaction.hash
  soldOrder.save()
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
  // 保存事件实体
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

  // 更新 Order 实体
  let orderId = event.params.orderId
  let orderIdString = orderId.toString()
  let order = Order.load(orderIdString)
  
  if (order != null) {
    order.status = 3 // Withdrawn 状态
    order.withdrawnAt = event.block.timestamp
    order.withdrawnBlockNumber = event.block.number
    order.withdrawnTransactionHash = event.transaction.hash
    order.updatedAt = event.block.timestamp
    order.updatedBlockNumber = event.block.number
    order.save()
  }

  // 更新 ActiveOrder 实体（订单已撤回）
  let activeOrder = ActiveOrder.load(orderIdString)
  if (activeOrder != null) {
    activeOrder.status = 3 // Withdrawn 状态
    activeOrder.withdrawnAt = event.block.timestamp
    activeOrder.withdrawnBlockNumber = event.block.number
    activeOrder.withdrawnTransactionHash = event.transaction.hash
    activeOrder.updatedAt = event.block.timestamp
    activeOrder.updatedBlockNumber = event.block.number
    activeOrder.save()
  }
}

export function handleOrderStatusUpdated(event: OrderStatusUpdatedEvent): void {
  // 保存事件实体
  let entity = new OrderStatusUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.orderId = event.params.orderId
  entity.status = event.params.status

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  // 更新 Order 实体
  let orderId = event.params.orderId
  let orderIdString = orderId.toString()
  let order = Order.load(orderIdString)
  
  if (order != null) {
    order.status = event.params.status
    order.updatedAt = event.block.timestamp
    order.updatedBlockNumber = event.block.number
    order.save()
  }

  // 处理 ActiveOrder 和 SoldOrder 实体
  // 注意：SoldOrder 的创建应该在 handleNFTSold 中处理，这里只处理状态更新
  let activeOrder = ActiveOrder.load(orderIdString)
  
  if (event.params.status == 2) {
    // 状态变为已售出 - 删除 ActiveOrder（如果存在）
    // SoldOrder 应该在 handleNFTSold 中创建
    if (activeOrder != null) {
      store.remove("ActiveOrder", orderIdString)
    }
  } else {
    // 状态变为其他（Listed, Cancelled, Withdrawn）
    // 删除 SoldOrder（如果存在）
    let soldOrder = SoldOrder.load(orderIdString)
    if (soldOrder != null) {
      store.remove("SoldOrder", orderIdString)
    }
    // 更新或创建 ActiveOrder
    if (activeOrder == null && order != null) {
      activeOrder = new ActiveOrder(orderIdString)
      activeOrder.orderId = order.orderId
      activeOrder.nftContract = order.nftContract
      activeOrder.tokenId = order.tokenId
      activeOrder.depositor = order.depositor
      activeOrder.price = order.price
      activeOrder.createdAt = order.createdAt
      activeOrder.createdBlockNumber = order.createdBlockNumber
      activeOrder.createdTransactionHash = order.createdTransactionHash
    }
    if (activeOrder != null) {
      activeOrder.status = event.params.status
      activeOrder.updatedAt = event.block.timestamp
      activeOrder.updatedBlockNumber = event.block.number
      activeOrder.save()
    }
  }
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
  // 保存事件实体
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

  // 尝试查找并更新对应的 Order 和 ActiveOrder 实体
  // 注意：PriceSet 事件没有 orderId，需要通过合约查询
  let marketplaceContract = NFTMarketplace.bind(event.address)
  let orderIdResult = marketplaceContract.try_getOrderIdByNFT(
    event.params.nftContract,
    event.params.tokenId
  )
  
  if (!orderIdResult.reverted) {
    let orderId = orderIdResult.value
    let orderIdString = orderId.toString()
    
    // 更新 Order 实体
    let order = Order.load(orderIdString)
    if (order != null) {
      order.price = event.params.price
      order.updatedAt = event.block.timestamp
      order.updatedBlockNumber = event.block.number
      order.save()
    }
    
    // 更新 ActiveOrder 实体（如果存在）
    let activeOrder = ActiveOrder.load(orderIdString)
    if (activeOrder != null) {
      activeOrder.price = event.params.price
      activeOrder.updatedAt = event.block.timestamp
      activeOrder.updatedBlockNumber = event.block.number
      activeOrder.save()
    }
  }
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
