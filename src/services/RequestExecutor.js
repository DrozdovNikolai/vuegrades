/**
 * Реализация HTTP-клиента (вместо axios).
 * методы: get, post, put, delete
 * @this baseUrl - базовый url - api/(rest rpc cursor)/schema/package/
 * @this loadingMask - флаг, вкл/выкл маску
 */
import { useMainStore } from "@/stores";

const INIT = {
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    }
};

class RequestExecutor {
    //TODO: Cancel request
    constructor() {
        this.baseUrl = "";
        this.loadingMask = true; //отключать, если не требуется глобальная маска
        console.info("Request Executor Init!");

    }



    setLocalStorage(key, data, ttl) {
        const cacheEntry = { data: data, expiry: Date.now() + ttl };
        localStorage.setItem(key, JSON.stringify(cacheEntry));
    }

    getLocalStorage(key) {
        const entry = localStorage.getItem(key);
        if (!entry) return null;
        return JSON.parse(entry);
    }
    clearLocalStorage(key) {
        localStorage.removeItem(key);
    }
    /**
     * GET
     *
     * @param {string} url Endpoint.
     * @param {number} code Код, если есть.
     * @return {Promise}
     */
    async get(url, code, forceUpdate = false) {
        const cacheKey = code ? `${url}/${code}` : url;
        console.log(forceUpdate)
        if (!forceUpdate) {
            const cached = this.getLocalStorage(cacheKey);
            if (cached && Date.now() < cached.expiry) {

                return Promise.resolve(cached.data);
            }
        }

        const result = await this.execute(cacheKey, false, { ...INIT, method: "GET" });




        return result;
    }

    /**
     * POST
     *
     * @param {string} url Endpoint.
     * @param {object} data Объект с данными. Будет помещён в тело запроса.
     * @return {Promise}
     */
    post(url, data) { return this.execute(url, false, { ...INIT, method: "POST" }, data); }

    /**
     * PUT
     *
     * @param {string} url Endpoint.
     * @param {number} code Код.
     * @param {object} data Объект с данными. Будет помещён в тело запроса.
     * @return {Promise}
     */
    put(url, code, data) { return this.execute(url + "/" + code, false, { ...INIT, method: "PUT" }, data); }

    /**
     * DELETE
     *
     * @param {string} url Endpoint.
     * @param {number} code Код.
     * @return {Promise}
     */
    delete(url, code) { return this.execute(url + "/" + code, false, { ...INIT, method: "DELETE" }); }


    /**
     * EXECUTE
     *
     * @param {string} url Endpoint.
     * @param {boolean} exact не подставлять baseUrl
     * @param {object} init параметры запроса
     * @param {object} data тело запроса
     * @return {Promise}
     */
    async execute(url, exact, init, data) {
        const mainStore = useMainStore();
        mainStore.setIsLoading(true);

        try {
            if (data) init = { ...init, body: JSON.stringify(data) };

            const location = exact ? url : this.baseUrl + url;
            const response = await fetch(location, init);

            const result = await response.json();

            if (init.method === "GET") {
                this.setLocalStorage(url, result, 300000);
            }
            else {
                this.clearLocalStorage(url.split("/")[0])
            }



            return result;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        } finally {
            mainStore.setIsLoading(false);
        }
    }

}

export default new RequestExecutor();