export function getSvg(name, background_color, size) {
  // add check to make sure svg exists, if not, return default dice image
  return svgs[name].replace("BACKGROUND_COLOR", background_color).replace("SIZE", size);
}

let svgs = {
   // dice
   cross_mark: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height: SIZE; width: SIZE;"><path d="M0 0h512v512H0z" fill="BACKGROUND_COLOR" fill-opacity="1"></path><g class="" transform="translate(0,0)" style="touch-action: none;"><path d="M105.367 18.328c23.14 15.444 46.098 31.27 68.55 47.572-45.055-20.895-94.51-35.918-149.37-44.246 46.697 26.72 91.596 55.58 135.705 85.524-37.203-18.033-77.48-32.22-121.602-41.37 58.218 34.322 109.368 72.465 154.71 114.206C136.02 227.227 86.295 284.717 45.79 354.18c27.11-24.29 54.91-47.545 82.868-70.68C81.942 339.36 45.05 405.01 20.2 482.135c20.36-24.62 40.988-48.203 61.905-70.817 44.7-67.485 89.567-147.11 148.856-170.418-29.61 30.708-63.36 75.164-98.25 118.145 40.99-40.437 83.09-77.46 126.415-111.512 61.598 70.49 110.757 149.38 152.145 235.873-6.738-44.794-16.796-87.384-30.03-127.666l46.444 65.53s-26.037-72.69-43.66-101.987c40.76 55.91 78.208 114.428 112.328 175.205-18.674-89.454-50.512-169.772-98.893-238.224 34.906 34.69 68.637 71.1 100.93 109.045C465.048 288.827 423.58 221.82 372.214 167c40.224-25.887 81.48-49.73 123.863-71.783-32.025 5.56-62.49 12.92-92.006 21.934 21.836-16.173 44.41-32.124 67.024-47.523-37.987 11.91-74.633 25.775-109.067 41.433 42.668-27.673 86.32-53.668 131.004-78.602h-.003c-67.47 18.055-130.83 42.19-188.998 73.548-56.294-41.79-122.01-71.787-198.663-87.68z" fill="#fff" fill-opacity="1"></path></g></svg>',

   electric: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height: SIZE; width: SIZE;"><path d="M0 0h512v512H0z" fill="BACKGROUND_COLOR" fill-opacity="1"></path><g class="" transform="translate(0,0)" style="touch-action: none;"><path d="M376 211H256V16L136 301h120v195z" fill="#fff" fill-opacity="1"></path></g></svg>',

   revolt: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height: SIZE; width: SIZE;"><path d="M0 0h512v512H0z" fill="BACKGROUND_COLOR" fill-opacity="1"></path><g class="" transform="translate(0,0)" style="touch-action: none;"><path d="M418.176 280.486c21.38-30.735 42.538-61.17 64.123-92.267-30.341-4.086-59.886-8.048-89.888-12.134 13.6-39.089 26.955-77.509 40.735-117.15-41.247 23.546-81.281 46.413-121.716 69.462-10.34-34.333-20.703-68.359-31.223-103.298-18.23 32.498-35.798 63.965-53.603 95.676-33.719-32.262-66.83-64.029-101.163-96.841 7.803 45.31 15.426 89.155 22.986 133.733-43.964-7.009-86.833-13.655-130.986-20.553 31.892 37.199 63.052 73.548 94.4 110.197-27.932 25.67-55.681 51.161-84.029 77.383 36.648 8.173 71.958 16.16 108.18 24.332-13.236 29.451-26.221 58.358-39.577 88.061 23.718-6.284 26.68-7.016 49.303-13.118 0 0 22.35-68.463 32.866-84.747 4.806-7.29 5.267-13.96 3.675-22.182-6.668-34.118-12.749-68.32-19.108-102.447-.39-1.934-.47-3.335 1.543-4.647 23.978-16.689 36.344-21.244 73.797-47.78 17.295 19.699 34.47 39.477 51.997 59.647a2368.384 2368.384 0 0 0-17.837 16.364c-.46.46-1.622.69-2.324.46-6.52-1.943-13.03-3.876-19.588-5.968-7.708-7.292-13.68-15.293-19.808-21.482-1.703 6.36-3.456 12.327-4.887 18.457 8.984 10.945 11.236 14.184 16.904 19.77 1.162 1.17 1.861 3.024 1.861 4.576 1.549 31.612.61 62.646 2.134 89.81 3.374.932 6.439 1.703 10.196 2.795-.773-34.13-1.353-67.71-2.244-101.52 2.053 0 3.995 1.012 5.618 3.877 19.688 32.305 37.333 64.041 54.95 93.455 2.944-1.712 5.858-3.415 8.843-5.127-1.513 4.573-6.594 10.905-9.314 14.822-9.388 14.727-25.093 22.027-37.995 30.863-15.624 24.762-28.247 50.076-38.257 67.658l14.789 37.443c.37.118 26.19-39.152 38.908-59.09 21.19 18.717 41.987 37.136 63.39 56.035 1.55-41.042 3.196-80.801 4.692-121.048 44.704 3.844 88.763 7.623 134.04 11.53-26.01-32.444-51.169-63.604-76.383-95.007zm-164.443-117.08c12.948-8.062 25.587-15.822 38.506-23.725 6.389 11.007 12.479 21.863 18.646 32.878-10.625 6.59-21.17 13.189-32.107 19.849-8.181-9.614-16.593-19.147-25.045-29.002zm51.184 59.027c-6.29-7.37-12.568-14.512-19.197-22.183 11.055-6.75 22.062-13.57 33.307-20.48 5.74 10.085 11.368 19.93 17.066 30.013-16.835 10.475-33.47 20.63-49.834 30.715-.11-.232-.23-.311-.459-.47 6.317-5.739 12.598-11.476 19.117-17.595zm-26.138 34.74c20.55-12.639 40.83-25.047 61.42-37.765 6.128 10.546 11.946 20.86 18.115 31.716-20.52 12.719-40.879 25.127-61.54 37.844-6.018-10.775-11.985-21.25-17.995-31.795zm40.479 71.033c-5.739-10.155-11.476-20.08-17.175-30.325 19.238-11.786 38.346-23.574 57.744-35.51 5.698 10.073 11.438 20.079 17.135 30.245-19.31 12.015-38.466 23.733-57.704 35.59z" fill="#fff" fill-opacity="1"></path></g></svg>',

   round_shield: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height: SIZE; width: SIZE;"><path d="M0 0h512v512H0z" fill="BACKGROUND_COLOR" fill-opacity="1"></path><g class="" transform="translate(0,0)" style="touch-action: none;"><path d="M261.563 64.28A191.758 191.758 0 0 0 64.25 256a191.758 191.758 0 1 0 383.5 0A191.758 191.758 0 0 0 261.562 64.28zm-4.625 9.126l8.937 5.156v10.313l-8.938 5.156-8.906-5.155V78.562l8.907-5.156zm3.53 29.25A153.407 153.407 0 0 1 409.407 256a153.407 153.407 0 0 1-306.812 0A153.407 153.407 0 0 1 260.47 102.656zm-11.53 20.03a133.607 133.607 0 0 0-65.157 20.908V368.22a133.607 133.607 0 0 0 65.157 21.092V122.688zm17.687.314v266.125a133.607 133.607 0 0 0 63.438-22.03V145a133.607 133.607 0 0 0-63.438-22zm-100.5 34.344A133.607 133.607 0 0 0 122.405 256a133.607 133.607 0 0 0 43.72 98.78V157.345zm-60.72 1.625l8.907 5.155v10.28l-8.906 5.157-8.937-5.156v-10.28l8.936-5.157zm300.5 0l8.94 5.155v10.28l-8.94 5.157-8.905-5.156v-10.28l8.906-5.157zm-58.155.093V353.03A133.607 133.607 0 0 0 389.594 256a133.607 133.607 0 0 0-41.844-96.938zm57.813 173.125l8.937 5.156v10.312l-8.938 5.156-8.906-5.156v-10.312l8.906-5.156zm-299.813.718l8.938 5.156v10.313l-8.938 5.156-8.938-5.155v-10.313l8.938-5.156zm149.906 85.188l8.938 5.156v10.313l-8.938 5.156-8.906-5.158V423.25l8.906-5.156z" fill="#fff" fill-opacity="1"></path></g></svg>',

   // Monsters
   goblin: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height: SIZE; width: SIZE;"><path d="M0 0h512v512H0z" fill="BACKGROUND_COLOR" fill-opacity="1"></path><g class="" transform="translate(0,0)" style="touch-action: none;"><path d="M256 33c-8.5 0-21.318 5.745-35.06 16.17-13.743 10.425-28.429 25.055-42.167 40.756-19.597 22.397-37.26 47.053-48.41 64.597l49.582 37.188 49.23 12.307 2.288-6.864 17.074 5.692-14.957 44.873 22.42 56.05 22.42-56.05-14.957-44.873 17.074-5.692 2.287 6.864 49.23-12.307 49.583-37.188c-11.15-17.544-28.813-42.2-48.41-64.597-13.738-15.7-28.424-30.33-42.166-40.756C277.318 38.745 264.5 33 256 33zm-91.49 95.213l76 44-9.02 15.574-76-44zm182.98 0l9.02 15.574-76 44-9.02-15.574zM17.21 146.625c31.804 32.973 63.213 73.408 76.3 111.857 1.59-2.708 3.38-5.333 5.292-7.882 5.009-6.68 11.036-12.972 17.14-19.153-8.95-12.884-11.752-29.088-12.605-42.886-29.308-24.142-53.916-37.693-86.127-41.936zm477.582 0c-32.21 4.243-56.819 17.794-86.127 41.936-.853 13.798-3.654 30.002-12.605 42.886 6.104 6.181 12.131 12.474 17.14 19.153 1.912 2.55 3.703 5.174 5.291 7.882 13.088-38.449 44.497-78.884 76.301-111.857zm-373.645 23.484c-.023.045-.054.1-.078.145.137 16.376 2.007 44.095 13.295 55.383l6.364 6.363-6.364 6.363c-8 8-15.74 15.805-21.164 23.037-4.688 6.251-7.327 11.823-7.965 16.452l81.118 30.418c4.7-6.847 9.904-13.253 15.285-18.633l16.029-16.03-.67 22.659c-.25 8.431-.383 16.131-.232 23.41l30.84 11.564L214.707 249h-50.98l-13.364 13.363-12.726-12.726 11.312-11.313-13.531-57.512zm269.708 0l-14.272 10.703-13.531 57.512 11.312 11.313-12.726 12.726L348.273 249h-50.98l-32.897 82.24 30.842-11.566c.15-7.278.018-14.978-.232-23.408l-.672-22.659 16.03 16.03c5.38 5.38 10.584 11.788 15.284 18.634l55.192-20.697 25.926-9.722c-.638-4.63-3.277-10.2-7.965-16.452-5.424-7.232-13.164-15.037-21.164-23.037L371.273 232l6.364-6.363c11.288-11.288 13.158-39.007 13.295-55.383-.024-.045-.055-.1-.078-.145zM157.867 197.65l7.848 33.35H183v-19.975l-10.945-2.736zm196.266 0l-14.188 10.64L329 211.024V231h17.285zM201 215.525V231h19.18l3.287-9.857zm110 0l-22.467 5.618L291.82 231H311zm-205.791 62.51a16.25 16.25 0 0 0-.117 1.256c7.79 37.424 34.985 88.461 66.066 129.256 15.682 20.582 32.34 38.649 47.582 51.271C233.983 472.441 248 479 256 479c8 0 22.017-6.559 37.26-19.182 15.242-12.622 31.9-30.689 47.582-51.271 31.081-40.795 58.277-91.832 66.066-129.256-.02-.41-.063-.83-.117-1.256l-48.027 72.043L256 435.715l-102.764-85.637zm45.756 36.188l15.799 23.699 2.968 2.474c1.753-5.409 4.259-10.906 7.176-16.445zm210.07 0l-25.943 9.728c2.917 5.539 5.423 11.036 7.176 16.445l2.968-2.474zm-162.129 7.73c-1.782 2.76-3.48 5.558-5.006 8.356-4.27 7.83-7.176 15.717-8.328 21.255l19.67 13.114c-4.116-14.232-5.864-28.048-6.336-42.725zm114.188 0c-.472 14.677-2.22 28.493-6.336 42.725l19.67-13.114c-1.152-5.538-4.057-13.425-8.328-21.255-1.527-2.798-3.224-5.596-5.006-8.356zm-19.227 17.457L265 350.236v54.55l7.793-6.495 7.158-14.316c8.04-16.081 12.051-29.95 13.916-44.565zm-75.734.002c1.864 14.614 5.876 28.483 13.916 44.563l7.158 14.316 7.793 6.494v-54.549z" fill="#fff" fill-opacity="1"></path></g></svg>',

   fat_goblin: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height: SIZE; width: SIZE;"><path d="M0 0h512v512H0z" fill=BACKGROUND_COLOR" fill-opacity="1"></path><g class="" transform="translate(0,0)" style="touch-action: none;"><path d="M256 25c-28.625 0-56.434 16.22-82.44 43.912-26.005 27.692-49.672 66.468-69.4 108.883C64.705 262.625 41 362.57 41 416c0 7 6.83 16.013 21.684 25.064 14.854 9.052 36.296 17.43 59.836 24.295C169.598 479.091 225.5 487 256 487c30.5 0 86.402-7.91 133.48-21.64 23.54-6.866 44.982-15.244 59.836-24.296C464.171 432.013 471 423 471 416c0-53.429-23.705-153.376-63.16-238.205-19.728-42.415-43.395-81.191-69.4-108.883C312.433 41.221 284.624 25 256 25zm-77.154 142.46S227 183 256 183c29 0 77.154-15.54 77.154-15.54l5.692 17.08S291 201 256 201c-35 0-82.846-16.46-82.846-16.46l5.692-17.08zM133.4 184.8l63.32 47.491C228.18 248.012 243.108 255 256 255s27.821-6.988 59.28-22.709l63.32-47.49 10.8 14.398-45.875 34.406c-5.22 22.311-12.93 40.726-21.722 54.29-5.809 8.961-12.03 16.3-19.078 20.683l12.673 31.684-7.285 3.742s-8.11 4.173-18.414 8.34C279.395 356.51 267.28 361 256 361c-11.279 0-23.395-4.49-33.7-8.656-10.303-4.167-18.413-8.34-18.413-8.34l-7.285-3.742 12.673-31.684c-7.049-4.383-13.27-11.722-19.078-20.683-8.791-13.564-16.502-31.979-21.722-54.29L122.6 199.2l10.8-14.398zm-86.455 9.798c-2.155.07-4.096.84-5.916 1.927.008 23.442.097 52.783 1.944 76.786.407 5.3.947 10.084 1.56 14.496a807.744 807.744 0 0 1 24.86-74.29c-2.305-7.398-6.916-12.736-12.024-15.8-3.638-2.183-7.184-3.224-10.424-3.12zm418.11 0c-3.24-.105-6.786.936-10.424 3.119-5.108 3.064-9.72 8.402-12.024 15.8a807.747 807.747 0 0 1 24.86 74.29 236.266 236.266 0 0 0 1.56-14.496c1.847-24.003 1.936-53.344 1.944-76.786-1.82-1.088-3.761-1.857-5.916-1.927zm-273.07 55.459c3.988 11.3 8.61 20.784 13.318 28.048 3.836 5.919 7.759 10.042 11.066 12.74l9.838-24.591c-9.536-3.85-20.536-9.347-34.223-16.197zm128.03 0c-13.686 6.85-24.686 12.348-34.222 16.197l9.838 24.592c3.307-2.699 7.23-6.822 11.066-12.74 4.709-7.265 9.33-16.75 13.319-28.05zM138.34 269.313c12.116.012 25.91 3.348 41.433 10.517l-7.546 16.34c-19.592-9.048-33.85-10.228-43.932-7.682-10.083 2.546-16.82 8.716-21.684 17.455-9.728 17.48-8.685 45.782-2.56 58.032l-16.102 8.05c-9.875-19.75-10.503-50.693 2.934-74.836 6.718-12.071 17.773-22.306 33.004-26.152 3.807-.961 7.824-1.531 12.052-1.683a64.8 64.8 0 0 1 2.4-.041zm235.32 0a64.8 64.8 0 0 1 2.4.04c4.229.153 8.246.723 12.053 1.684 15.23 3.846 26.286 14.081 33.004 26.152 13.437 24.143 12.809 55.086 2.934 74.836l-16.102-8.05c6.125-12.25 7.168-40.552-2.56-58.032-4.864-8.74-11.601-14.909-21.684-17.455-10.083-2.546-24.34-1.366-43.932 7.682l-7.546-16.34c15.524-7.17 29.317-10.505 41.433-10.517zm-130.236 2.355l-23.922 59.805c2.786 1.28 5.783 2.661 9.547 4.183C238.529 339.49 250.413 343 256 343s17.471-3.51 26.951-7.344c3.764-1.522 6.761-2.902 9.547-4.183l-23.922-59.805c-4.217.864-8.35 1.332-12.576 1.332-4.226 0-8.36-.468-12.576-1.332zm-107.549 60.207l94.418 47.21C238.301 376.514 246.871 375 256 375c9.13 0 17.699 1.513 25.707 4.086l94.418-47.211-41.537 83.076c10.698 11.12 18.648 21.558 23.775 26.686l-12.726 12.726C327.515 436.242 298 393 256 393s-71.515 43.242-89.637 61.363l-12.726-12.726c5.128-5.128 13.078-15.567 23.777-26.688l-41.539-83.074zm40.252 40.252l14.34 28.68 14.34-14.34-28.68-14.34zm159.746 0l-28.68 14.34 14.34 14.34 14.34-28.68z" fill="#fff" fill-opacity="1"></path></g></svg>',

   fierce_goblin: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height: SIZE; width: SIZE;"><path d="M0 0h512v512H0z" fill="BACKGROUND_COLOR" fill-opacity="1"></path><g class="" transform="translate(0,0)" style="touch-action: none;"><path d="M256 51c-1.216 1.157-3.235 3.694-5.595 7.47-4.552 7.283-10.594 19.233-18.383 34.8v9.94c6.19 4.752 14.906 7.626 23.978 7.626 9.072 0 17.787-2.874 23.978-7.627v-9.94c-7.79-15.567-13.83-27.517-18.383-34.8-2.36-3.776-4.38-6.313-5.595-7.47zm-42.743 54.286c-28.17 6.895-55.87 20.62-82.175 41.132-16.04 80.706-31.2 175.83-16.89 254.565 6.188 2.322 12.687 4.44 19.403 6.398l-3.062-12.257-4.305-6.455 7.807-5.204c6.304-4.203 13.54-7.85 21.487-10.99-5.028-6.777-8.326-15.44-11.545-24.286-5.46-15.013-9.66-31.84-13.654-44.028l-9.792-29.87 24.565 19.616c24.47 19.543 49.132 32.704 82.918 56.314l10.07 7.037c5.944-.26 11.928-.39 17.917-.39 5.99 0 11.973.13 17.916.39l10.07-7.037c33.787-23.61 58.45-36.77 82.92-56.314l24.563-19.616-9.793 29.87c-3.995 12.19-8.193 29.015-13.654 44.028-3.22 8.847-6.517 17.51-11.545 24.287 7.948 3.138 15.183 6.786 21.487 10.99l7.807 5.203-4.305 6.455-3.062 12.258c6.716-1.956 13.215-4.075 19.402-6.397 14.31-78.736-.85-173.86-16.89-254.565-26.305-20.51-54.004-34.237-82.174-41.132v6.31l-2.75 2.746c-10.55 10.552-25.398 15.26-39.993 15.26-14.595 0-29.442-4.708-39.994-15.26l-2.75-2.746v-6.31zm75.98 55.876l13.39 13.145-6.572 6.695c-12.91 13.147-27.168 19.604-41.277 18.865-14.108-.74-26.793-8.077-38.39-18.442l-6.995-6.253 12.504-13.99 6.996 6.25c9.774 8.735 18.788 13.273 26.867 13.696 8.08.423 16.495-2.67 26.905-13.272l6.573-6.694zm-149.998 3.885c19.807 0 41.364 9.12 60.852 19.946 19.487 10.826 36.416 23.397 45.862 32.843l-13.268 13.267c-7.234-7.234-23.665-19.683-41.708-29.707-18.043-10.024-38.186-17.584-51.74-17.584v-18.765zm233.52 0v18.765c-13.552 0-33.695 7.56-51.738 17.584-18.043 10.024-34.474 22.473-41.708 29.707l-13.268-13.267c9.446-9.446 26.375-22.017 45.862-32.843 19.488-10.827 41.045-19.946 60.853-19.946zm-226.887 36.11c16.68 16.68 47.577 47.29 93.447 47.29v.316l16.757-24.214 16.603 24.475v-.578c45.87 0 76.767-30.61 93.447-47.29l13.268 13.266c-8.234 8.233-21.14 21.197-38.61 32.218 4.916 4.755 7.998 11.397 7.998 18.697 0 14.283-11.78 26.063-26.063 26.063-14.282 0-26.062-11.78-26.062-26.063 0-.183.01-.364.014-.546-3.9.798-7.922 1.415-12.06 1.828l28.074 41.386-3.79 5.315c-7.152 10.026-16.657 15.68-26.033 18.204-9.376 2.525-18.523 2.41-26.863 2.41s-17.496.107-26.944-2.4-19.065-8.05-26.67-17.95l-4.17-5.425 28.773-41.58c-4-.41-7.887-1.017-11.662-1.79.004.183.014.364.014.547 0 14.283-11.78 26.063-26.062 26.063-14.283 0-26.063-11.78-26.063-26.063 0-7.3 3.082-13.942 7.998-18.696-17.47-11.02-30.376-23.984-38.61-32.217l13.268-13.267zm-128.076 16.11c2.95 6.932 8.367 15.73 16.54 27.413 12.455 17.8 29.556 41.635 46.575 75.674 1.848 3.697 4.587 6.08 8.64 7.774.07-13.807.677-27.726 1.7-41.656l-24.876-21.55 12.286-14.184 14.638 12.68c.938-9.016 2.026-18.007 3.23-26.948-7.94-6.23-17.723-10.416-28.564-13.373-16.628-4.535-34.943-5.58-50.17-5.83zm476.406 0c-15.226.25-33.54 1.295-50.17 5.83-10.84 2.957-20.623 7.142-28.562 13.373 1.204 8.94 2.292 17.932 3.23 26.947l14.638-12.68 12.286 14.185-24.875 21.55c1.02 13.93 1.628 27.848 1.7 41.656 4.05-1.694 6.79-4.077 8.638-7.774 17.02-34.04 34.12-57.873 46.575-75.674 8.173-11.682 13.59-20.48 16.54-27.412zm-238.28 40.48L221.81 307.04c3.74 3.347 7.608 5.175 12.06 6.356 6.265 1.663 13.79 1.772 22.13 1.772s15.874-.117 21.982-1.762c4.345-1.17 8.01-2.94 11.476-6.216l-33.535-49.442zm-66.643.292c-4.142 0-7.298 3.155-7.298 7.297 0 4.14 3.156 7.297 7.298 7.297 4.14 0 7.297-3.156 7.297-7.297 0-4.142-3.156-7.298-7.297-7.298zm133.44 0c-4.14 0-7.297 3.155-7.297 7.297 0 4.14 3.156 7.297 7.297 7.297 4.142 0 7.298-3.156 7.298-7.297 0-4.142-3.156-7.298-7.298-7.298zm-166.322 67.34c1.684 5.604 3.355 11.28 5.214 16.392 4.053 11.14 9.25 19.18 12.498 22.424l27.458-9.153c-16.38-10.857-31.114-20.08-45.17-29.662zm199.204 0c-14.056 9.583-28.79 18.806-45.17 29.663l27.458 9.153c3.247-3.245 8.445-11.283 12.498-22.424 1.86-5.112 3.53-10.788 5.214-16.39zM256 375.634c-41.212 0-82.64 7.558-105.97 20.12l13.58 54.32c61.668 14.57 123.112 14.57 184.78 0l13.58-54.32c-23.33-12.562-64.758-20.12-105.97-20.12zm-.018 10.543c23.4-.08 46.826 4.167 70.074 13.005l8.77 3.334-6.67 17.542-8.77-3.336c-42.466-16.144-84.223-15.572-126.88.04l-8.814 3.226-6.448-17.623 8.81-3.223c23.152-8.473 46.527-12.883 69.928-12.964z" fill="#fff" fill-opacity="1"></path></g></svg>',
}
