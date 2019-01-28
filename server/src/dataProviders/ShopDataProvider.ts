import * as FormData from 'form-data';
import fetch from 'node-fetch';
import * as moment from 'moment';

const API_URL = 'https://silpo.ua/graphql';

const API_DATE_TIME_FORMAT_WITH_TIME = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]';
/**
 *  external API expects input dates in format with zero-valued milliseconds time
 * */
const API_DATE_TIME_FORMAT_WITHOUT_TIME = 'YYYY-MM-DDTHH:mm:ss.000[Z]';

export interface AccountInfo {
    firstName: string,
    lastName: string,
    middleName: string
}

export interface PurchaseHistoryItem {
    purchasedAt: Date,
    amount: number,
    pricePerUnit: number,
    productName: string
}

export default class ShopDataProvider {

    private readonly apiUrl: string;

    private readonly  accessToken: string;

    constructor(accessToken: string) {
        this.accessToken = accessToken;
        this.apiUrl = API_URL;
    }

    async getAccountInfo(): Promise<AccountInfo> {
        const query = `
            query meDetailed {
                me: meDetailed {
                    firstName
                    lastName
                    middleName
                }
            }
        `;
        const {me} = await this.queryApi(query);
        const propNames: Array<keyof AccountInfo> = ['firstName', 'lastName', 'middleName'];
        assertPropsExist(me, propNames);
        return me as AccountInfo;
    }

    async listPurchaseHistoryItems({dateFrom, dateTo}: {dateFrom: Date, dateTo: Date}): Promise<PurchaseHistoryItem[]> {
        const result: PurchaseHistoryItem[] = [];

        const checks = await this.listChecksHistory(dateFrom, dateTo);
        for(const check of checks) {
            const checkItems = await this.listCheckItems(check);

            const historyItems = checkItems.map(({name, count, price}) => ({
                productName: name,
                amount: count,
                pricePerUnit: price,
                purchasedAt: moment(check.created, API_DATE_TIME_FORMAT_WITH_TIME).toDate()
            }));

            result.push(...historyItems);
        }

        return result
    }

    private async listCheckItems(check: CheckInfo) {
        const query = `
            query check($storeId: ID!, $checkId: ID!, $creationDate: DateTime!) {
                check(storeId: $storeId, checkId: $checkId, creationDate: $creationDate) {
                    items {
                        name
                        count
                        price
                    }
                }
            }
        `;
        const data: {check: {items: CheckItemInfo[]}} = await this.queryApi(query, {
            checkId: check.id,
            creationDate: check.created,
            storeId: check.storeId
        });
        const propNames: Array<keyof CheckItemInfo> = ['name', 'count', 'price'];
        const {items} = data.check;
        items.forEach((item) => {
            assertPropsExist(item, propNames);
        });
        return items;
    }

    private async listChecksHistory(dateFrom: Date, dateTo: Date) {
        const listChecksQuery = `
            query checks($dateFrom: DateTime, $dateTo: DateTime) {
                checks(dateFrom: $dateFrom, dateTo: $dateTo) {
                    id
                    created
                    storeId
                }
            }
        `;
        const data: {checks: CheckInfo[]} = await this.queryApi(listChecksQuery, {
            dateFrom: moment(dateFrom).format(API_DATE_TIME_FORMAT_WITHOUT_TIME),
            dateTo: moment(dateTo).format(API_DATE_TIME_FORMAT_WITHOUT_TIME)
        });
        const {checks} = data;
        const propNames: Array<keyof CheckInfo> = ['id', 'created', 'storeId'];
        checks.forEach((check) => {
            assertPropsExist(check, propNames);
        });
        return checks;
    }

    private async queryApi(query: string, variables: {[key: string]: any} = {}): Promise<any> {

        const formData = new FormData();
        formData.append('query', query);
        formData.append('variables', JSON.stringify(variables));

        const response = await fetch(this.apiUrl, {
            method: 'POST',
            body: formData,
            headers: {
                ...COMMON_REQUEST_HEADERS,
                ...formData.getHeaders(),
                'access-token': this.accessToken
            }
        });

        if(response.ok) {
            const {data, errors} = await response.json();
            if(errors) {
                const apiErrors: ErrorInstance[] = errors;
                //TODO: introduce API interaction error type
                throw new Error(`API errors: [${apiErrors.map((err) => err.message).join(', ')}]`);
            } else {
                return data;
            }
        } else {
            throw new Error(`API respond ${response.status}: '${response.statusText}'`);
        }
    }
}

interface ErrorInstance {
    message: string
}

type CheckInfo = {id: string, created: string, storeId: number};

type CheckItemInfo = {name: string, count: number, price: number};

const assertPropsExist = (object: object, props: string[]) => {
    const missingProps = props.filter((prop) => !(prop in object));
    if(missingProps.length > 0) {
        throw new Error(`Object is missing properties: '${missingProps.join(', ')}'`);
    }
}

//not mandatory. just to avoid extra attention to our actions.
const COMMON_REQUEST_HEADERS = {
    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
    'origin': 'https://my.silpo.ua',
    'referer': 'https://silpo.ua/gift-certificates',
};
