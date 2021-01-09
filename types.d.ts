/**
 * An Avanza API wrapper.

### Constants

Some methods require certain constants as parameters. These are described below.

#### Instrument types

| Type                          | Note |
| :---------------------------- | :--- |
| `Avanza.STOCK`                |      |
| `Avanza.FUND`                 |      |
| `Avanza.BOND`                 |      |
| `Avanza.OPTION`               |      |
| `Avanza.FUTURE_FORWARD`       |      |
| `Avanza.CERTIFICATE`          |      |
| `Avanza.WARRANT`              |      |
| `Avanza.EXCHANGE_TRADED_FUND` |      |
| `Avanza.INDEX`                |      |
| `Avanza.PREMIUM_BOND`         |      |
| `Avanza.SUBSCRIPTION_OPTION`  |      |
| `Avanza.EQUITY_LINKED_BOND`   |      |
| `Avanza.CONVERTIBLE`          |      |

#### Periods

| Period                | Note |
| :-------------------- | :--- |
| `Avanza.TODAY`        |      |
| `Avanza.ONE_WEEK`     |      |
| `Avanza.ONE_MONTH`    |      |
| `Avanza.THREE_MONTHS` |      |
| `Avanza.THIS_YEAR`    |      |
| `Avanza.ONE_YEAR`     |      |
| `Avanza.FIVE_YEARS`   |      |

#### Lists

| List                                              | Note |
| :------------------------------------------------ | :--- |
| `Avanza.HIGHEST_RATED_FUNDS`                      |      |
| `Avanza.LOWEST_FEE_INDEX_FUNDS`                   |      |
| `Avanza.BEST_DEVELOPMENT_FUNDS_LAST_THREE_MONTHS` |      |
| `Avanza.MOST_OWNED_FUNDS`                         |      |

#### Channels

Note that for all channels where a _sequence_ of account IDs are expected
(`<accountId1>,<accountId2>,...`), you must supply all of your account IDs,
regardless of whether or not you want data for that account.

| Channel                     | Note                                                                                                                |
| :-------------------------- | :------------------------------------------------------------------------------------------------------------------ |
| `Avanza.QUOTES`             | Minute-wise data containing current price, change, total volume traded etc. Expects an **orderbookId**.             |
| `Avanza.ORDERDEPTHS`        | Best five offers and current total volume on each side. Expects an **orderbookId**.                                 |
| `Avanza.TRADES`             | Updates whenever a new trade is made. Data contains volume, price, broker etc. Expects an **orderbookId**.          |
| `Avanza.BROKERTRADESUMMARY` | Pushes data about which brokers are long/short and how big their current net volume is. Expects an **orderbookId**. |
| `Avanza.POSITIONS`          | Your positions in an instrument. Expects a string of `<orderbookId>_<accountId1>,<accountId2,<accountId3>,...`.     |
| `Avanza.ORDERS`             | Your current orders. Expects a string of `_<accountId1>,<accountId2,<accountId3>,...`.                              |
| `Avanza.DEALS`              | Recent trades you have made. Expects a string of `_<accountId1>,<accountId2,<accountId3>,...`.                      |
| `Avanza.ACCOUNTS`           | N/A. Expects a string of `_<accountId>`.                                                                            |

#### Transaction Types

| Transaction type          | Note |
| :------------------------ | :--- |
| `Avanza.OPTIONS`          |      |
| `Avanza.FOREX`            |      |
| `Avanza.DEPOSIT_WITHDRAW` |      |
| `Avanza.BUY_SELL`         |      |
| `Avanza.DIVIDEND`         |      |
| `Avanza.INTEREST`         |      |
| `Avanza.FOREIGN_TAX`      |      |

#### Order Types

| Order type    | Note |
| :------------ | :--- |
| `Avanza.BUY`  |      |
| `Avanza.SELL` |      |
 */
declare class Avanza extends EventEmitter {
    /**
     * Authenticate the client.
    
    If second factor authentication is needed, either the one time code can be provided in `totp`, or the secret to
    generate codes can be provided in `totpSecret`.
     */
    authenticate(credentials: {
        username: string;
        password: string;
        totp: string;
        totpSecret: string;
    }): void;
    /**
     * Disconnects by simulating a client that just goes away.
     */
    disconnect(): void;
    /**
     * Get all `positions` held by this user.
     */
    getPositions(): void;
    /**
     * Get an overview of the users holdings at Avanza Bank.
     */
    getOverview(): void;
    /**
     * Get the performance of a users whole portfolio at Avanza Bank.
     * @param period - The period from which to fetch data. See [Periods](#periods).
     */
    getPortfolioPerformance(period: Period): void;
    /**
     * Get an overview of a users performance account at Avanza Bank.
     * @param accountId - A valid account ID.
     */
    getAccountOverview(accountId: string): void;
    /**
     * Get recent deals and orders.
     */
    getDealsAndOrders(): void;
    /**
     * Get all transactions of an account.
     * @param accountOrTransactionType - A valid account ID or a
                                             [Transaction Type](#transaction-type).
     * @param options - Configuring which transactions to fetch.
     * @param [options.from] - On the form YYYY-MM-DD.
     * @param [options.to] - On the form YYYY-MM-DD.
     * @param [options.maxAmount] - Only fetch transactions of at most this value.
     * @param [options.minAmount] - Only fetch transactions of at least this value.
     * @param [options.orderbookId] - Only fetch transactions involving
                                                this/these orderbooks.
     */
    getTransactions(accountOrTransactionType: string, options: {
        from?: string;
        to?: string;
        maxAmount?: number;
        minAmount?: number;
        orderbookId?: string | any[];
    }): void;
    /**
     * Get all watchlists created by this user. Note that the second table was
    created from a specific watchlist, and so the response from the API will be
    different for you.
     */
    getWatchlists(): void;
    /**
     * Add an instrument to the watchlist.
     * @param instrumentId - The ID of the instrument to add.
     * @param watchlistId - The ID of the watchlist to add the instrument to.
     */
    addToWatchlist(instrumentId: string, watchlistId: string): void;
    /**
     * Remove an instrument from the watchlist.
     * @param instrumentId - The ID of the instrument to remove.
     * @param watchlistId - The ID of the watchlist to remove the instrument from.
     */
    removeFromWatchlist(instrumentId: string, watchlistId: string): void;
    /**
     * Get instrument information.
     * @param instrumentId - Likely the same as the instrumentId.
     * @param instrumentType - The type of the instrument. See
                                   [Instrument Types](#instrument-types).
     */
    getInstrument(instrumentId: string, instrumentType: string): void;
    /**
     * Get orderbook information.
     * @param orderbookId - Likely the same as the instrumentId.
     * @param instrumentType - The type of the instrument. See
                                   [Instrument Types](#instrument-types).
     */
    getOrderbook(orderbookId: string, instrumentType: string): void;
    /**
     * Get information about multiple orderbooks.
     * @param orderbookIds - A list of orderbook IDs.
     */
    getOrderbooks(orderbookIds: any[]): void;
    /**
     * Get an array of prices over a period of time.
     * @param orderbookId - The orderbook to fetch price data about.
     * @param period - The period from which to fetch data. See [Periods](#periods).
     */
    getChartdata(orderbookId: string, period: Period): void;
    /**
     * List all inspiration lists.
     */
    getInspirationLists(): void;
    /**
     * Get information about a single inspiration list.
     * @param list - List type. See [Lists](#lists)
     */
    getInspirationList(list: string): void;
    /**
     * Subscribe to real-time data.
     * @param channel - The channel on which to listen. See [Channels](#channels).
     * @param ids - One or many IDs to subscribe to.
     */
    subscribe(channel: string, ids: string | any[], callback: (...params: any[]) => any): void;
    /**
     * Place a limit order.
     * @param options - Order options.
     * @param options.accountId - ID of the account to trade on.
     * @param options.orderbookId - ID of the instrument to trade.
     * @param options.orderType - One of "BUY" or "SELL".
     * @param options.price - The price limit of the order.
     * @param options.validUntil - A date on the form YYYY-MM-DD. Cancels
                                       the order if this date is passed.
     * @param options.volume - How many securities to order.
     * @returns Properties are `messages`, `requestId`, `status`, `orderId`.
     */
    placeOrder(options: {
        accountId: string;
        orderbookId: string;
        orderType: string;
        price: number;
        validUntil: string;
        volume: number;
    }): any;
    /**
     * Get information about an order.
    
    It is quite hard to automatically generate tables of what this endpoint
    returns since orders are merely temporary entities.
    
    The returned object however looks very much like that from
    [getOrderbook()](#getorderbook) with an extra property `order` which
    contains information you already have (such as order price or volume).
     * @param instrumentType - Instrument type of the pertaining instrument.
                                   See [Instrument Types](#instrument-types).
     * @param accountId - ID of the account which this order was placed on.
     * @param orderId - ID of the order.
     */
    getOrder(instrumentType: string, accountId: string, orderId: string): void;
    /**
     * Edit an order.
     * @param instrumentType - Instrument type of the pertaining instrument.
                                   See [Instrument Types](#instrument-types).
     * @param orderId - Order ID received when placing the order.
     * @param options - Order options. See [placeOrder()](#placeorder).
     */
    editOrder(instrumentType: string, orderId: string, options: any): void;
    /**
     * Delete and cancel an order.
     * @param accountId - ID of the account on which this order was placed.
     * @param orderId - Order ID received when the order was placed.
     */
    deleteOrder(accountId: string, orderId: string): void;
    /**
     * Free text search for an instrument.
     * @param query - Search query.
     * @param [type] - An instrument type.
     */
    search(query: string, type?: string): void;
    /**
     * Make a call to the API. Note that this method will filter dangling question
    marks from `path`.
     * @param [method = 'GET'] - HTTP method to use.
     * @param [path = ''] - The URL to send the request to.
     * @param [data = {}] - JSON data to send with the request.
     */
    call(method?: string, path?: string, data?: any): Promise;
}

