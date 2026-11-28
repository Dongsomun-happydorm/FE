import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import cameraIcon from '@/assets/register/camera.svg'
import removeImageIcon from '@/assets/register/remove-image.svg'
import minusIcon from '@/assets/register/minus.svg'
import plusIcon from '@/assets/register/plus.svg'
import FloorToggle from '@/components/FloorToggle'
import Header from '@/components/Header'
import Input from '@/components/Input'
import TabBar from '@/components/TabBar'
import Mainbutton from '@/components/icons/Mainbutton'
import { useSharing } from '@/data/SharingProvider'
import { CURRENT_USER_ID, TABS } from '@/data/sharingItems'
import { FLOORS_BY_ZONE } from '@/constants/building'
import { useBuildingStore } from '@/stores/buildingStore'

const MAX_IMAGES = 10

function ImagePreview({ file, onRemove }: { file: File; onRemove: () => void }) {
  const [url, setUrl] = useState('')

  useEffect(() => {
    const previewUrl = URL.createObjectURL(file)
    setUrl(previewUrl)
    return () => URL.revokeObjectURL(previewUrl)
  }, [file])

  return (
    <li className="relative size-[53px] shrink-0">
      {url && <img src={url} alt={file.name} className="size-full rounded-md object-cover" />}
      <button
        type="button"
        aria-label={`${file.name} 이미지 삭제`}
        className="absolute top-1 right-1 size-3 cursor-pointer rounded-full"
        onClick={onRemove}
      >
        <img src={removeImageIcon} alt="" />
      </button>
    </li>
  )
}

export default function SharingRegisterPage() {
  const navigate = useNavigate()
  const { addItem } = useSharing()
  const { selectedZone, activeFloor, setFloor } = useBuildingStore()
  const floors = FLOORS_BY_ZONE[selectedZone]
  const picker = useRef<HTMLInputElement>(null)
  const nextImageId = useRef(0)
  const [images, setImages] = useState<{ id: number; file: File }[]>([])
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [location, setLocation] = useState('')
  const [memo, setMemo] = useState('')
  const [imageMessage, setImageMessage] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [saving, setSaving] = useState(false)

  const canRegister =
    images.length > 0 &&
    images.length <= MAX_IMAGES &&
    name.trim().length > 0 &&
    quantity > 0 &&
    location.trim().length > 0 &&
    floors.includes(activeFloor)

  function addImages(event: ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(event.currentTarget.files ?? [])
    event.currentTarget.value = ''
    const validImages = selected.filter((file) => file.type.startsWith('image/'))
    const remaining = MAX_IMAGES - images.length
    const additions = validImages
      .slice(0, remaining)
      .map((file) => ({ id: nextImageId.current++, file }))

    setImages((current) => [...current, ...additions].slice(0, MAX_IMAGES))
    setImageMessage(
      validImages.length < selected.length
        ? '이미지 파일만 등록할 수 있어요.'
        : validImages.length > remaining
          ? '이미지는 최대 10장까지 등록할 수 있어요.'
          : ''
    )
  }

  async function register(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!canRegister || saving) return

    setSaving(true)
    setSubmitError('')
    try {
      await addItem({
        id: crypto.randomUUID(),
        ownerId: CURRENT_USER_ID,
        building: selectedZone,
        floor: activeFloor,
        images: images.map(({ file }) => file),
        name: name.trim(),
        quantity,
        unit: '개',
        location: location.trim(),
        memo: memo.trim(),
        status: 'sharing',
        createdAt: new Date().toISOString(),
      })
      navigate('/list', { replace: true })
    } catch {
      setSubmitError('물품을 저장하지 못했어요. 다시 시도해 주세요.')
      setSaving(false)
    }
  }

  return (
    <div className="bg-gray-white flex h-dvh w-full flex-col">
      <div className="shrink-0">
        <Header />
        <TabBar
          tabs={TABS}
          activeTab="map"
          onTabChange={(tab) => navigate(tab === 'list' ? '/list' : '/', { replace: true })}
        />
        <div className="pt-3">
          <FloorToggle floors={floors} activeFloor={activeFloor} onFloorChange={setFloor} />
        </div>
      </div>

      <form onSubmit={register} className="flex min-h-0 flex-1 flex-col">
        <main className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 pt-3 pb-3">
          <section className="flex flex-col gap-2" aria-labelledby="register-images">
            <div className="flex flex-col gap-1">
              <h1 id="register-images" className="typography-body2-medium text-gray-black">
                물품 이미지
              </h1>
              <p id="register-image-help" className="typography-caption text-gray-500">
                최대 10장까지 물품 이미지를 업로드해주세요
              </p>
            </div>
            <input ref={picker} type="file" accept="image/*" multiple hidden onChange={addImages} />
            <div className="flex min-h-[65px] items-center gap-2 overflow-x-auto p-1.5">
              <button
                type="button"
                aria-label="물품 이미지 선택"
                aria-describedby="register-image-help"
                className="flex size-[53px] shrink-0 items-center justify-center rounded-md border-[0.4px] border-gray-200 bg-gray-100 enabled:cursor-pointer disabled:opacity-50"
                disabled={images.length >= MAX_IMAGES}
                onClick={() => picker.current?.click()}
              >
                <img src={cameraIcon} alt="" />
              </button>
              <ul className="flex gap-2">
                {images.map(({ id, file }) => (
                  <ImagePreview
                    key={id}
                    file={file}
                    onRemove={() => {
                      setImages((current) => current.filter((image) => image.id !== id))
                      setImageMessage('')
                    }}
                  />
                ))}
              </ul>
            </div>
            {imageMessage && (
              <p role="status" className="typography-caption text-gray-600">
                {imageMessage}
              </p>
            )}
          </section>

          <div className="flex flex-col gap-2">
            <label htmlFor="register-name" className="typography-body2-medium text-gray-black">
              물품명
            </label>
            <Input
              id="register-name"
              value={name}
              onChange={setName}
              placeholder="물품명을 입력해주세요"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <span id="register-quantity" className="typography-body2-medium text-gray-black">
              물품 수량
            </span>
            <div
              role="group"
              aria-labelledby="register-quantity"
              className="flex items-center gap-1"
            >
              <button
                type="button"
                aria-label="수량 감소"
                disabled={quantity === 0}
                onClick={() => setQuantity((amount) => Math.max(0, amount - 1))}
                className="flex size-6 items-center justify-center rounded-md bg-gray-100 enabled:cursor-pointer"
              >
                <img src={minusIcon} alt="" />
              </button>
              <output
                aria-label="물품 수량"
                className="typography-body1-semibold grid h-8 min-w-8 place-items-center text-gray-700"
              >
                {quantity}
              </output>
              <button
                type="button"
                aria-label="수량 증가"
                onClick={() => setQuantity((amount) => amount + 1)}
                className="flex size-6 cursor-pointer items-center justify-center rounded-md bg-gray-100"
              >
                <img src={plusIcon} alt="" />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-0.5">
              <label
                htmlFor="register-location"
                className="typography-body2-medium text-gray-black"
              >
                휴게실 내 상세 위치
              </label>
              <p id="register-location-help" className="typography-caption text-gray-500">
                현재는 휴게실에서의 물품 나눔만 가능해요
              </p>
            </div>
            <Input
              id="register-location"
              aria-describedby="register-location-help"
              value={location}
              onChange={setLocation}
              placeholder="ex) 전자레인지 위"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="register-memo" className="typography-body2-medium text-gray-black">
              메모
            </label>
            <Input
              id="register-memo"
              value={memo}
              onChange={setMemo}
              placeholder="메모를 입력해주세요"
            />
          </div>
        </main>

        <div className="shrink-0 px-4 pt-3 pb-10">
          {submitError && (
            <p role="alert" className="typography-caption mb-2 text-gray-600">
              {submitError}
            </p>
          )}
          <Mainbutton type="submit" fullWidth disabled={!canRegister || saving}>
            {saving ? '저장 중…' : `${selectedZone} ${activeFloor}에 나눔 예약하기`}
          </Mainbutton>
        </div>
      </form>
    </div>
  )
}
