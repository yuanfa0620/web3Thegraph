import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { FeesWithdrawn } from "../generated/schema"
import { FeesWithdrawn as FeesWithdrawnEvent } from "../generated/WhitelistManager/WhitelistManager"
import { handleFeesWithdrawn } from "../src/whitelist-manager"
import { createFeesWithdrawnEvent } from "./whitelist-manager-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#tests-structure

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let to = Address.fromString("0x0000000000000000000000000000000000000001")
    let amount = BigInt.fromI32(234)
    let newFeesWithdrawnEvent = createFeesWithdrawnEvent(to, amount)
    handleFeesWithdrawn(newFeesWithdrawnEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#write-a-unit-test

  test("FeesWithdrawn created and stored", () => {
    assert.entityCount("FeesWithdrawn", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "FeesWithdrawn",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "to",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "FeesWithdrawn",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#asserts
  })
})
