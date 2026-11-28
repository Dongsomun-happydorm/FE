interface ConfirmDeleteModalProps {
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDeleteModal({ onConfirm, onCancel }: ConfirmDeleteModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-xs rounded-xl bg-white p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex flex-col gap-1">
          <p className="typography-body1-semibold text-gray-black">
            나눔 물품을 삭제하시겠습니까?
          </p>
          <p className="typography-body2-regular text-gray-black">
            삭제하면 복구할 수 없으며, 다시 나눔 물품을 등록해야합니다.
          </p>
        </div>
        <div className="flex gap-3.5">
          <button
            type="button"
            onClick={onCancel}
            className="typography-body1-semibold flex h-15 flex-1 items-center justify-center rounded-xl bg-gray-100 text-gray-500"
          >
            취소하기
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="typography-body1-semibold flex h-15 flex-1 items-center justify-center rounded-xl bg-error-100 text-error-500"
          >
            삭제하기
          </button>
        </div>
      </div>
    </div>
  )
}
