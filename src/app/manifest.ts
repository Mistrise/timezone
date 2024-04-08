import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Timehub portal",
        short_name: "Timehub",
        icons: [
            {
            src: "src/app/images/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png"
            },
            {
                src: "src/app/images/android-chrome-512x512.png",
                sizes: "512x512",
                type: "image/png"
            }
        ],
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone"
    }
}