import { ImageResponse } from "next/og"

// Square, branded PWA icons generated on the fly so the web app manifest has real
// correctly-sized icons (the previous manifest pointed at a non-square photo declared
// as 192/512 squares, which fails PWA installability checks). Reuses the "AD" monogram
// from the favicon for visual consistency.

const ALLOWED = new Set([192, 512])

export function generateStaticParams() {
  return [{ size: "192" }, { size: "512" }]
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ size: string }> }
) {
  const { size: rawSize } = await params
  const size = Number.parseInt(rawSize, 10)
  const dimension = ALLOWED.has(size) ? size : 512

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: dimension * 0.5,
          background: "black",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: "bold",
        }}
      >
        AD
      </div>
    ),
    {
      width: dimension,
      height: dimension,
    }
  )
}
