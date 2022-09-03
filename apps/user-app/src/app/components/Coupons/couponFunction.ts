import { CouponType } from "./Coupons"

export const flatCoupon = (total: number, coupon: CouponType) => {
    return total - coupon.amount
}

export const flatPercentageCoupon = (total: number, coupon: CouponType) => {
    const amountToRemove = coupon.percentage / 100 * total
    const totalAmount = total - amountToRemove
    return { totalAmount, amountToRemove }
}

export const percentageCouponUpto = (total: number, coupon: CouponType) => {
    const amountToRemove = coupon.percentage / 100 * total
    if (amountToRemove > coupon.percentageupto) {
        const totalAmount = total - coupon.percentageupto
        return { totalAmount, amountToRemove }
    } else {
        const totalAmount = total - amountToRemove
        return { totalAmount, amountToRemove }
    }
} 