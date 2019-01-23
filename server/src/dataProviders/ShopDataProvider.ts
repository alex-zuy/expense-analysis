import * as FormData from 'form-data';
import fetch from 'node-fetch';

const API_URL = 'https://silpo.ua/graphql';
// const API_URL = 'http://requestbin.fullcontact.com/102vmbn1';
// const API_URL = 'http://localhost:4000/test';

export interface AccountInfo {
    firstName: string,
    lastName: string,
    middleName: string
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
        return pickProps(me, propNames) as AccountInfo;
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
                const apiErrors: ErrorResponse[] = errors;
                throw new Error(`API errors: [${apiErrors.map((err) => err.message).join(', ')}]`);
            } else {
                return data;
            }
        } else {
            throw new Error(`API respond ${response.status}: '${response.statusText}'`);
        }
    }
}

interface ErrorResponse {
    message: string
}

const assertPropsExist = (object: object, props: string[]) => {
    const missingProps = props.filter((prop) => !(prop in object));
    if(missingProps.length > 0) {
        throw new Error(`Object is missing properties: '${missingProps.join(', ')}'`);
    }
}

const pickProps = (obj: object, props: string[]) => {
    return props.reduce(
        (result, propName) => ({...result, [propName]: obj[propName]}),
        {}
    );
};

//not mandatory. just to avoid extra attention to our actions.
const COMMON_REQUEST_HEADERS = {
    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
    'origin': 'https://my.silpo.ua',
    'referer': 'https://silpo.ua/gift-certificates',
};