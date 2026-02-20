export { };

declare global {
    interface Window {
        twttr?: any;
        instgrm?: any;
    }
}

// declare global {
//     interface Window {
//         twttr?: {
//             widgets: {
//                 load: (el?: HTMLElement | null) => void;
//             };
//         };
//         instgrm?: {
//             Embeds: {
//                 process: () => void;
//             };
//         };
//     }
// }