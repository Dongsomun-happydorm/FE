import batteryIcon from '@/assets/mypage/battery.svg'
import cellularIcon from '@/assets/mypage/cellular.svg'
import indicatorIcon from '@/assets/mypage/indicator.svg'
import statusTime from '@/assets/mypage/status-time.svg'
import wifiIcon from '@/assets/mypage/wifi.svg'

export default function PhoneStatusBar() {
  return (
    <div aria-hidden="true" className="relative h-[47px] shrink-0 bg-[#fcfdff]">
      <img src={statusTime} alt="" className="absolute top-[15.19px] left-[33.25px]" />
      <div className="absolute top-[16.77px] right-[14.67px] flex items-center gap-[4.192px]">
        <img src={cellularIcon} alt="" />
        <img src={wifiIcon} alt="" />
        <img src={batteryIcon} alt="" />
      </div>
      <img src={indicatorIcon} alt="" className="absolute top-[8.38px] right-[74.41px]" />
    </div>
  )
}
