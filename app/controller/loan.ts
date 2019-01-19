import { Controller, Context } from 'egg'

export default class LoanController extends Controller {
  constructor(ctx: Context) {
    super(ctx)
    this.getRequestPayload = ctx.helper.getRequestPayload
    this.stdout = ctx.helper.stdout
    this.stderr = ctx.helper.stderr
  }

  public async search() {
    const { ctx } = this
    try {
      const payload = this.getRequestPayload(ctx)
      ctx.validate({
        name: 'string'
      }, payload)
      const data = await this.service.loan.search(payload)
      this.stdout(ctx, data)
      console.log(this.ctx.name)
    } catch (err) {
     this.stderr(ctx, err)
    }
  }

  public async application() {
    const { ctx } = this
    try {
      const payload = this.getRequestPayload(ctx)
      ctx.validate({
        name: 'string',
        phone: 'string',
        amount: 'int',
      }, payload)
      const data = await this.service.loan.application(payload)
      this.stdout(ctx, data)
      console.log(this.ctx.name)
    } catch (err) {
     this.stderr(ctx, err)
    }
  }

  public async calculator() {
    const { ctx } = this
    try {
      const payload = this.getRequestPayload(ctx)
      ctx.validate({
       job: 'string',
       houseType: 'string',
       phone: 'string',
       monthlyIncome: 'int',
       housePrice: 'int',
       carPrice: 'int',
      }, payload)
      const data = await this.service.loan.calculator(payload)
      this.stdout(ctx, data)
      console.log(this.ctx.name)
    } catch (err) {
     this.stderr(ctx, err)
    }
  }

  public async alive() {
    const { ctx } = this
    try {
      this.stdout(ctx, 'alive')
    } catch (err) {
      this.stderr(ctx, err)
    }
  }
/*
  public async deleteUser() {
    const { ctx } = this
    try {
      const payload = this.getRequestPayload(ctx)
      ctx.validate({
        name: 'string'
      }, payload)
      const data = await this.service.home.deleteUser(payload)
      this.stdout(ctx, data)
    } catch (err) {
     this.stderr(ctx, err)
    }
  }

  public async modify() {
    const { ctx } = this

    try {
      const payload = this.getRequestPayload(ctx)
      ctx.validate({
        name: 'string'
      }, payload)
      const data = await this.service.home.modify(payload)
      this.stdout(ctx, data)
    } catch (err) {
     this.stderr(ctx, err)
    }
  }
*/
}
