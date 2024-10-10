<template>
  <div>
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div class="w-full flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
          <svg class="h-14 pb-3.5 fill-secondary-green"
              viewBox="0 0 276.70975 241.25051"
              xml:space="preserve"
              id="svg2"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:svg="http://www.w3.org/2000/svg"
              xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
              xmlns:cc="http://creativecommons.org/ns#"
              xmlns:dc="http://purl.org/dc/elements/1.1/"><g
     transform="matrix(1.25,0,0,-1.25,-0.40445359,270.32525)"
     id="g10"><path
       id="path18142"
       d="m 103.03985,216.25987 c -0.53318,-0.003 -1.07528,-0.0323 -1.62683,-0.0875 -13.746201,-1.37532 -21.334812,-16.99931 -14.470438,-28.78623 2.808078,-4.822 7.903031,-7.61783 12.251218,-10.86491 8.67934,-6.48197 18.02076,-12.43683 26.26072,-19.46438 H 44.822995 25.21991 c -5.378426,0 -10.736355,0.1039 -15.5345185,-2.67505 -13.2107382,-7.65112 -12.4121092,-28.3674 2.2192165,-34.13995 7.013276,-2.76737 16.251321,-1.28156 23.671652,-1.28156 h 47.713155 c -1.312307,-10.37517 -0.739749,-20.979732 -0.739749,-31.438899 0,-14.617248 -0.961624,-28.734418 6.825244,-41.795242 1.882269,-3.157198 4.270109,-5.920138 6.859925,-8.506997 17.097945,-17.077245 41.148345,-13.685165 63.247675,-13.68517 15.87775,0 31.25175,-0.294701 44.38434,10.152629 19.94076,15.863326 17.75373,39.11694 17.75373,61.971899 0,14.00071 0.31138,27.15988 -7.19439,39.57604 -4.80127,7.94257 -12.18492,12.8234 -19.43621,18.2616 -11.25402,8.44079 -22.70407,16.6233 -34.02799,24.96976 l -37.72669,27.74022 c -6.19509,4.56611 -12.19768,10.10653 -20.19545,10.05368 z m 90.48799,-97.82977 a 13.149216,13.982492 0 0 0 13.14915,-13.98206 13.149216,13.982492 0 0 0 -13.14915,-13.982811 13.149216,13.982492 0 0 0 -13.14915,13.982811 13.149216,13.982492 0 0 0 13.14915,13.98206 z" /></g>
          </svg>
          <span class="self-center align-text-bottom text-4xl font-semibold whitespace-nowrap text-secondary-blue dark:text-white">Lazy Rabbit :: Topology Visualizer</span>
        </a>
      </div>
    </nav>
    <section class="w-full p-4">
      <NuxtPage />  
    </section>
    <footer class="bg-white dark:bg-gray-900">
      <div class="mx-auto w-full p-4 py-6 lg:py-8">
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div class="sm:flex sm:items-center sm:justify-between">
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024 <a href="https://axidlab.com/" class="hover:underline">Axid Lab Ltd.</a>. All Rights Reserved.
            |
            MIT licensed
          </span>
          <div class="flex mt-4 sm:justify-center sm:mt-0">
            <a href="https://github.com/axidlab/lazy-rabbit" class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clip-rule="evenodd"/>
              </svg>
              <span class="sr-only">GitHub account</span>
            </a>
          </div>
        </div>
      </div>
    </footer>

  </div>
</template>

<script setup lang="ts">
import {useFlowbite} from "~/composables/useFlowbite";

onMounted(() => {
  useFlowbite(() => {
    initFlowbite();
  })
})

</script>