/*-
 * ‌
 * Hedera JavaScript SDK
 * ​
 * Copyright (C) 2020 - 2022 Hedera Hashgraph, LLC
 * ​
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ‍
 */

import ExchangeRate from "./ExchangeRate.js";
import * as HashgraphProto from "@hashgraph/proto";
import * as symbols from "./Symbols.js";

const { proto } = HashgraphProto;

export default class ExchangeRates {
    /**
     * @private
     * @param {object} props
     * @param {ExchangeRate} props.currentRate
     * @param {ExchangeRate} props.nextRate
     */
    constructor(props) {
        /**
         * @readonly
         */
        this.currentRate = props.currentRate;

        /**
         * @readonly
         */
        this.nextRate = props.nextRate;

        Object.freeze(this);
    }

    /**
     * @internal
     * @param {HashgraphProto.proto.IExchangeRateSet} rateSet
     * @returns {ExchangeRates}
     */
    static _fromProtobuf(rateSet) {
        return new ExchangeRates({
            currentRate: ExchangeRate._fromProtobuf(
                /** @type {HashgraphProto.proto.IExchangeRate} */ (
                    rateSet.currentRate
                )
            ),
            nextRate: ExchangeRate._fromProtobuf(
                /** @type {HashgraphProto.proto.IExchangeRate} */ (
                    rateSet.nextRate
                )
            ),
        });
    }

    /**
     * @internal
     * @returns {HashgraphProto.proto.IExchangeRateSet}
     */
    [symbols.toProtobuf]() {
        return {
            currentRate: this.currentRate[symbols.toProtobuf](),
            nextRate: this.nextRate[symbols.toProtobuf](),
        };
    }

    /**
     * @param {Uint8Array} bytes
     * @returns {ExchangeRates}
     */
    static fromBytes(bytes) {
        return ExchangeRates._fromProtobuf(proto.ExchangeRateSet.decode(bytes));
    }
}
