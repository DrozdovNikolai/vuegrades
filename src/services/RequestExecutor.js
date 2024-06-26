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
        this.abortControllers = new Map();
        console.info("Request Executor Init!");

    }

    cancelAllRequests() {
        for (const [url, controller] of this.abortControllers.entries()) {
            controller.abort();
            console.info(`Request to ${url} has been cancelled.`);
        }
        this.abortControllers.clear();
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
        const controller = new AbortController();
        this.abortControllers.set(url, controller);
        try {
            if (data) { init = { ...init, body: JSON.stringify(data) } };
            init.signal = controller.signal;
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

            if (error.name === "AbortError") {
                console.error("Фетч отменён", error);
            } else {
                throw new Error(error);
            }
        } finally {
            this.abortControllers.delete(url);
            mainStore.setIsLoading(false);
        }
    }

}

export default new RequestExecutor();