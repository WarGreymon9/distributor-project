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
    }
}