"use client"
import { Control, Controller } from "react-hook-form"
import { TourSchema } from "@/lib/authSchema"
import { FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ImageIcon, X } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

interface ImagesStepProps {
    control: Control<TourSchema>
}

const ImagesStep = ({ control }: ImagesStepProps) => {
    const [coverPreview, setCoverPreview] = useState<string | null>(null)
    const [galleryPreviews, setGalleryPreviews] = useState<string[]>([])

    return (
        <div className="flex flex-col gap-8">

            {/* ── Cover Image ────────────────────────────────── */}
            <div className="flex flex-col gap-3">
                <h3 className="font-semibold text-base text-foreground">Cover Image</h3>
                <Controller
                    control={control}
                    name="imageCover"
                    render={({ field: { onChange }, fieldState: { error } }) => (
                        <FormItem>
                            <FormLabel>Upload Cover Image</FormLabel>
                            <label
                                htmlFor="imageCover"
                                className="mt-2 flex flex-col items-center justify-center gap-3 h-48 rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 cursor-pointer hover:bg-primary/10 transition-colors"
                            >
                                {coverPreview ? (
                                    <div className="relative w-full h-full">
                                        <Image src={coverPreview} alt="Cover preview" fill className="object-cover rounded-xl" />
                                        <button
                                            type="button"
                                            onClick={e => { e.preventDefault(); setCoverPreview(null); onChange(undefined) }}
                                            className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black/80"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <ImageIcon className="w-10 h-10 text-primary/50" />
                                        <span className="text-sm text-muted-foreground">Click to upload a cover image</span>
                                        <span className="text-xs text-muted-foreground">PNG, JPG up to 10MB</span>
                                    </>
                                )}
                            </label>
                            <input
                                id="imageCover"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={e => {
                                    const file = e.target.files?.[0]
                                    if (file) {
                                        onChange(file)
                                        setCoverPreview(URL.createObjectURL(file))
                                    }
                                }}
                            />
                            {error && <FormMessage>{error.message}</FormMessage>}
                        </FormItem>
                    )}
                />
            </div>

            {/* ── Gallery Images ─────────────────────────────── */}
            <div className="flex flex-col gap-3">
                <h3 className="font-semibold text-base text-foreground">Gallery Images <span className="text-muted-foreground font-normal text-sm">(optional)</span></h3>
                <Controller
                    control={control}
                    name="images"
                    render={({ field: { onChange } }) => (
                        <FormItem>
                            <FormLabel>Upload Gallery Photos</FormLabel>
                            <label
                                htmlFor="images"
                                className="mt-2 flex flex-col items-center justify-center gap-3 h-32 rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 cursor-pointer hover:bg-primary/10 transition-colors"
                            >
                                <ImageIcon className="w-8 h-8 text-primary/50" />
                                <span className="text-sm text-muted-foreground">Click to upload multiple images</span>
                            </label>
                            <input
                                id="images"
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                onChange={e => {
                                    const files = Array.from(e.target.files ?? [])
                                    onChange(files)
                                    setGalleryPreviews(files.map(f => URL.createObjectURL(f)))
                                }}
                            />

                            {galleryPreviews.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-3">
                                    {galleryPreviews.map((src, i) => (
                                        <div key={i} className="relative w-24 h-24 rounded-lg overflow-hidden border border-primary/20">
                                            <Image src={src} alt={`Gallery ${i + 1}`} fill className="object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const next = galleryPreviews.filter((_, j) => j !== i)
                                                    setGalleryPreviews(next)
                                                }}
                                                className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 hover:bg-black/80"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </FormItem>
                    )}
                />
            </div>

        </div>
    )
}

export default ImagesStep
