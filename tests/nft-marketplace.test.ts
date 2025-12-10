import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { EmergencyWithdrawAll } from "../generated/schema"
import { EmergencyWithdrawAll as EmergencyWithdrawAllEvent } from "../generated/NFTMarketplace/NFTMarketplace"
import { handleEmergencyWithdrawAll } from "../src/nft-marketplace"
import { createEmergencyWithdrawAllEvent } from "./nft-marketplace-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#tests-structure

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let totalWithdrawn = BigInt.fromI32(234)
    let newEmergencyWithdrawAllEvent =
      createEmergencyWithdrawAllEvent(totalWithdrawn)
    handleEmergencyWithdrawAll(newEmergencyWithdrawAllEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#write-a-unit-test

  test("EmergencyWithdrawAll created and stored", () => {
    assert.entityCount("EmergencyWithdrawAll", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "EmergencyWithdrawAll",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "totalWithdrawn",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#asserts
  })
})
