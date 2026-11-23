const styles = [
  { label: 'Heading 1', className: 'typography-h1' },
  { label: 'Heading 2', className: 'typography-h2' },
  { label: 'Heading 3', className: 'typography-h3' },
  { label: 'Subtitle 1', className: 'typography-subtitle1' },
  { label: 'Subtitle 2', className: 'typography-subtitle2' },
  { label: 'Body 1 / Semibold', className: 'typography-body1-semibold' },
  { label: 'Body 1 / Medium', className: 'typography-body1-medium' },
  { label: 'Body 2 / Semibold', className: 'typography-body2-semibold' },
  { label: 'Body 2 / Medium', className: 'typography-body2-medium' },
  { label: 'Body 2 / Regular', className: 'typography-body2-regular' },
  { label: 'Caption', className: 'typography-caption' },
]

export default function TextStyles() {
  return (
    <div className="flex flex-col gap-5 p-10">
      {styles.map(({ label, className }) => (
        <p key={label} className={`${className} text-gray-black whitespace-nowrap`}>
          {label}
        </p>
      ))}
    </div>
  )
}
