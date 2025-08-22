import request from './request.js'

export default {
    getGoodsList (data) {
        return request.get('/app/goods/list',data)
    },
    getCarouselList (data) {
        return request.get('/app/carousel/list',data)
    },
    getGoodsInfo (data) {
        return request.get(`/app/goods/info/${data}`)
    },
    getCategoryTree (data) {
        return request.get('/app/category/tree',data)
    },
    getDictionaryList () {
        return request.get(`/app/dict/data/4/list`)
    },
}
