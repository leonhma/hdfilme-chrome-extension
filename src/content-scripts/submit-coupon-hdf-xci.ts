window.onload = async function () {
    const siteType = window.location.hostname.includes('hdfilme') ? 'HDFILME.TV' : 'XCINE.TV'
    const currentTimestamp = new Date().valueOf();
    const storage = await chrome.storage.local.get({ lastCouponRedeemHDFilme: 0 })
    const lastCouponRedeem = storage.lastCouponRedeemHDFilme as number || 0
    // make sure last redeem was more than 10 seconds ago, to not trigger on the reload after submission
    if (currentTimestamp - lastCouponRedeem > 10000) {
        const couponInput = document.querySelector(siteType == 'HDFILME.TV' ? '#coupon_code' : '#couponCode') as HTMLInputElement;
        const coupon = await fetch(
            `https://leonhma.vercel.app/api/putput-claim-coupon?site_type=${siteType}&duration_type=1_day`
        ).then(res => res.json())
        console.log(coupon)
        couponInput.value = coupon.code
        await chrome.storage.local.set({ lastCouponRedeemHDFilme: currentTimestamp });
    }
}
