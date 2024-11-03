/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Address,
  Contract,
  ContractState,
  TestContractResult,
  HexString,
  ContractFactory,
  EventSubscribeOptions,
  EventSubscription,
  CallContractParams,
  CallContractResult,
  TestContractParams,
  ContractEvent,
  subscribeContractEvent,
  subscribeContractEvents,
  testMethod,
  callMethod,
  multicallMethods,
  fetchContractState,
  Asset,
  ContractInstance,
  getContractEventsCurrentCount,
  TestContractParamsWithoutMaps,
  TestContractResultWithoutMaps,
  SignExecuteContractMethodParams,
  SignExecuteScriptTxResult,
  signExecuteMethod,
  addStdIdToFields,
  encodeContractFields,
  Narrow,
} from "@alephium/web3";
import { default as CalculatorContractJson } from "../test/Calculator.ral.json";
import { getContractByCodeHash, registerContract } from "./contracts";

// Custom types for the contract
export namespace CalculatorTypes {
  export type Fields = {
    admin: Address;
    calculation: bigint;
  };

  export type State = ContractState<Fields>;

  export interface CallMethodTable {
    editAdmin: {
      params: CallContractParams<{ newAdmin: Address }>;
      result: CallContractResult<null>;
    };
    addTen: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<null>;
    };
  }
  export type CallMethodParams<T extends keyof CallMethodTable> =
    CallMethodTable[T]["params"];
  export type CallMethodResult<T extends keyof CallMethodTable> =
    CallMethodTable[T]["result"];
  export type MultiCallParams = Partial<{
    [Name in keyof CallMethodTable]: CallMethodTable[Name]["params"];
  }>;
  export type MultiCallResults<T extends MultiCallParams> = {
    [MaybeName in keyof T]: MaybeName extends keyof CallMethodTable
      ? CallMethodTable[MaybeName]["result"]
      : undefined;
  };
  export type MulticallReturnType<Callss extends MultiCallParams[]> = {
    [index in keyof Callss]: MultiCallResults<Callss[index]>;
  };

  export interface SignExecuteMethodTable {
    editAdmin: {
      params: SignExecuteContractMethodParams<{ newAdmin: Address }>;
      result: SignExecuteScriptTxResult;
    };
    addTen: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
  }
  export type SignExecuteMethodParams<T extends keyof SignExecuteMethodTable> =
    SignExecuteMethodTable[T]["params"];
  export type SignExecuteMethodResult<T extends keyof SignExecuteMethodTable> =
    SignExecuteMethodTable[T]["result"];
}

class Factory extends ContractFactory<
  CalculatorInstance,
  CalculatorTypes.Fields
> {
  encodeFields(fields: CalculatorTypes.Fields) {
    return encodeContractFields(
      addStdIdToFields(this.contract, fields),
      this.contract.fieldsSig,
      []
    );
  }

  consts = { CalcCodes: { NotAdmin: BigInt("0") } };

  at(address: string): CalculatorInstance {
    return new CalculatorInstance(address);
  }

  tests = {
    editAdmin: async (
      params: TestContractParamsWithoutMaps<
        CalculatorTypes.Fields,
        { newAdmin: Address }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "editAdmin", params, getContractByCodeHash);
    },
    addTen: async (
      params: Omit<
        TestContractParamsWithoutMaps<CalculatorTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "addTen", params, getContractByCodeHash);
    },
  };

  stateForTest(
    initFields: CalculatorTypes.Fields,
    asset?: Asset,
    address?: string
  ) {
    return this.stateForTest_(initFields, asset, address, undefined);
  }
}

// Use this object to test and deploy the contract
export const Calculator = new Factory(
  Contract.fromJson(
    CalculatorContractJson,
    "",
    "ac40b964ea0f127cf99c3022ac234c9a639cf6aba3b0ce62479ff1b2cf1917e6",
    []
  )
);
registerContract(Calculator);

// Use this class to interact with the blockchain
export class CalculatorInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<CalculatorTypes.State> {
    return fetchContractState(Calculator, this);
  }

  view = {
    editAdmin: async (
      params: CalculatorTypes.CallMethodParams<"editAdmin">
    ): Promise<CalculatorTypes.CallMethodResult<"editAdmin">> => {
      return callMethod(
        Calculator,
        this,
        "editAdmin",
        params,
        getContractByCodeHash
      );
    },
    addTen: async (
      params?: CalculatorTypes.CallMethodParams<"addTen">
    ): Promise<CalculatorTypes.CallMethodResult<"addTen">> => {
      return callMethod(
        Calculator,
        this,
        "addTen",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
  };

  transact = {
    editAdmin: async (
      params: CalculatorTypes.SignExecuteMethodParams<"editAdmin">
    ): Promise<CalculatorTypes.SignExecuteMethodResult<"editAdmin">> => {
      return signExecuteMethod(Calculator, this, "editAdmin", params);
    },
    addTen: async (
      params: CalculatorTypes.SignExecuteMethodParams<"addTen">
    ): Promise<CalculatorTypes.SignExecuteMethodResult<"addTen">> => {
      return signExecuteMethod(Calculator, this, "addTen", params);
    },
  };
}