const Toggle = ({ checked = false, onChange, size = 'md', label }) => {
  const sizes = {
    sm: { trackW: 36, trackH: 20, thumbSize: 14, padding: 3 },
    md: { trackW: 44, trackH: 24, thumbSize: 16, padding: 4 },
    lg: { trackW: 56, trackH: 28, thumbSize: 20, padding: 4 },
  };
  const s = sizes[size] || sizes.md;
  const offX = s.padding;
  const onX = s.trackW - s.thumbSize - s.padding;

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onChange?.(!checked)}
        style={{ width: s.trackW, height: s.trackH }}
        className={`relative rounded-full shrink-0 transition-colors duration-200 ${checked ? 'bg-primary' : 'bg-[#374151]'}`}
      >
        <span
          style={{
            width: s.thumbSize,
            height: s.thumbSize,
            top: (s.trackH - s.thumbSize) / 2,
            left: checked ? onX : offX,
            transition: 'left 0.2s cubic-bezier(0.4,0,0.2,1)',
          }}
          className="absolute bg-white rounded-full shadow-md"
        />
      </button>
      {label && <span className="text-sm text-text-secondary select-none">{label}</span>}
    </div>
  );
};

export default Toggle;
