import { Service, Context } from 'egg'
import { LoanProductsModel } from '../model'
import { LoanUsersModel } from '../model'

export default class Loan extends Service {
  constructor(ctx: Context) {
    super(ctx)
  }

// 这里实现搜素框查询功能
    public async search({ name }: { name: string }): Promise<any> {
    const { app } = this
    const loanProductRepository  = app.typeorm.getRepository(LoanProductsModel)
    const product = await loanProductRepository.find({
      name
    })
    console.log(product)
    if (product.length) {
      return product
    }
    return '搜索到0条相关信息'
  }

// 这里实现贷款页面的贷款计算器
public async calculator({ name= ' ', amount = 0 , job, monthlyIncome, houseType, housePrice, carPrice, phone }:
{  name: string, amount: number,  job: string, monthlyIncome: number, houseType: string, housePrice: number, carPrice: number, phone: string }): Promise<any> {
  const { app } = this
  const loanUserRepository  = app.typeorm.getRepository(LoanUsersModel)
  const user = new LoanUsersModel()
  user.job = job
  user.monthlyIncome = monthlyIncome
  user.houseType = houseType
  user.housePrice = housePrice
  user.carPrice = carPrice
  user.phone = phone
  user.name = name
  user.amount = amount
  if (user.phone) {
    const result = await loanUserRepository.save(user)
    return result
  }
}

// 这里实现首页用户对想了解业务的申请功能
public async application({  housePrice = 0, name, phone, amount , job = ' ', monthlyIncome= 0, houseType = ' ', carPrice = 0 }:
  {  housePrice: number,  name: string, phone: string, amount: number, job: string,  monthlyIncome: number, houseType: string, carPrice: number}): Promise<LoanUsersModel> {
  const { app } = this
  const loanUserRepository  = app.typeorm.getRepository(LoanUsersModel)
  const user = new LoanUsersModel()
  user.name = name
  user.phone = phone
  user.amount = amount

  user.housePrice = housePrice
  user.monthlyIncome = monthlyIncome
  user.houseType = houseType
  user.job = job
  user.carPrice = carPrice
  const result = await loanUserRepository.save(user)
  return result
}
 /*
// 这里实现产品增加功能
public async addProduct({name, productId = '1', type}: { name: string, productId: string, type: string}): Promise<HomeProductModel> {

  const { app } = this
  const greetingRepository  = app.typeorm.getRepository(HomeProductModel)
  const newProduct = new HomeProductModel()
  newProduct.productId = productId
  newProduct.name = name
  newProduct.type = type
  const result = await greetingRepository.save(newProduct)
  console.log(result)
  return newProduct
}
* */
}
