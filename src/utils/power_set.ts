export default function bwPowerSet (originalSet: any) {
    const subSets = []
    const numberOfCombinations = 2 ** originalSet.length

    for (let combinationIndex = 0; combinationIndex < numberOfCombinations; combinationIndex += 1) {
      const subSet = []
  
      for (let setElementIndex = 0; setElementIndex < originalSet.length; setElementIndex += 1) {
        if (combinationIndex & (1 << setElementIndex)) {
          subSet.push(originalSet[setElementIndex])
        }
      }
  
      subSets.push(subSet)
    }
    return subSets

}

export interface SkuObject {
  skuId: string;
  specsText: string;
  count: number
}

export interface CartItem {
  skuId: string;
  count?: number;
  // 其他购物车项属性...
  name?: string;
  price?: number;
}
export interface Goods {
  skuId: string;
  count: number;
  id: string;
  name: string;
  price: number;
  picture: string;
  // 其他商品属性...
}