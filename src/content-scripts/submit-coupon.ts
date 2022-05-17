window.onload = async function () {
    const currentTimestamp = new Date().valueOf();
    const { lastCouponRedeem } = await chrome.storage.local.get('lastCouponRedeem')
    // make sure last redeem was more than 10 seconds ago, to not trigger on the reload after submission
    if (currentTimestamp - (lastCouponRedeem ?? 0) > 10000) {
        const couponInput = document.querySelector('#coupon_code') as HTMLInputElement;
        const coupon = await fetch(
            'https://leonhma.vercel.app/api/putput-claim-coupon?site_type=HDFILME.TV&duration_type=1_day'
        ).then(res => res.json())
        couponInput.value = coupon.code
        await chrome.storage.local.set({ lastCouponRedeem: currentTimestamp });
    }    
}
