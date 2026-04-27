export function EqBar({ delay }: { delay: number }) {
  return (
    <div
      style={{
        width: 2,
        height: "100%",
        background: "#1DB954",
        borderRadius: 1,
        animation: `vp-eq 0.8s ease-in-out ${delay}s infinite`,
        transformOrigin: "bottom",
      }}
    />
  );
}
