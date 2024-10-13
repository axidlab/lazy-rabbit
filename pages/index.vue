<template>
  <!-- Usage modal -->
  <div id="default-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-2xl max-h-full">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Usage</h3>
          <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <div class="p-4 md:p-5 space-y-4">
          <div class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            <ContentDoc path="/usage" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- drawer node info -->
  <div id="drawer-node-info" ref="drawerNodeInfo" class="fixed z-40 h-screen w-auto overflow-y-auto bg-white p-4 dark:bg-gray-800" tabindex="-1" aria-labelledby="drawer-js-label">
    <h5 id="drawer-right-label" class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"><svg class="w-4 h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
    </svg>{{ nodeInfo.metadata?.kind }}: {{ nodeInfo.attributes?.name }}</h5>
    <button type="button" data-drawer-hide="drawer-node-info" aria-controls="drawer-node-info" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
      </svg>
      <span class="sr-only">Close</span>
    </button>
    <pre class="mb-6 text-sm text-gray-500 dark:text-gray-400">
      {{ JSON.stringify(nodeInfo.attributes, null, 2) }}
    </pre>
  </div>

  <div>
    <form @submit.prevent="handleFileUpload">
      <input @change="handleFileChange"  accept="application/json" class="text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file">
      <button type="submit" class="text-white bg-secondary-blue hover:bg-primary-blue focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm ml-1 px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Show topology</button>
      or
      <button type="button" v-on:click="loadSample" class="text-secondary-blue hover:text-white border border-secondary-blue hover:bg-primary-blue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-2 me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Load sample</button>
      <button data-modal-target="default-modal" data-modal-toggle="default-modal" type="button" class="align-middle">
        <svg class="text-secondary-green hover:text-primary-blue dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.008-3.018a1.502 1.502 0 0 1 2.522 1.159v.024a1.44 1.44 0 0 1-1.493 1.418 1 1 0 0 0-1.037.999V14a1 1 0 1 0 2 0v-.539a3.44 3.44 0 0 0 2.529-3.256 3.502 3.502 0 0 0-7-.255 1 1 0 0 0 2 .076c.014-.398.187-.774.48-1.044Zm.982 7.026a1 1 0 1 0 0 2H12a1 1 0 1 0 0-2h-.01Z" clip-rule="evenodd"/>
        </svg>
        <span class="sr-only">Usage</span>
      </button>
    </form>
  </div>
  
  <v-network-graph
      @click.ctrl="startBoxSelection"
      class="graph"
      ref="graph"
      :nodes="nodes"
      :edges="edges"
      :layouts="layouts"
      :configs="configs"
      :eventHandlers="eventHandlers">
    <template #edge-label="{ edge, ...slotProps }">
      <v-edge-label :text="edge.label" align="center" vertical-align="above" v-bind="slotProps" />
    </template>
  </v-network-graph>

  <div id="accordion-flush" data-accordion="collapse" data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white" data-inactive-classes="text-gray-500 dark:text-gray-400">
    <h2 id="accordion-flush-heading-1">
      <button type="button" class="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3" data-accordion-target="#accordion-flush-body-1" aria-expanded="false" aria-controls="accordion-flush-body-1">
        <span>Source definitions</span>
        <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
        </svg>
      </button>
    </h2>
    <div id="accordion-flush-body-1" class="hidden" aria-labelledby="accordion-flush-heading-1">
      <pre>{{ fileContent }}</pre>
    </div>
    <h2 id="accordion-flush-heading-2">
      <button type="button" class="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3" data-accordion-target="#accordion-flush-body-2" aria-expanded="false" aria-controls="accordion-flush-body-2">
        <span>Nodes</span>
        <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
        </svg>
      </button>
    </h2>
    <div id="accordion-flush-body-2" class="hidden" aria-labelledby="accordion-flush-heading-2">
      <pre>{{ nodes }}</pre>
    </div>
    <h2 id="accordion-flush-heading-3">
      <button type="button" class="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3" data-accordion-target="#accordion-flush-body-3" aria-expanded="false" aria-controls="accordion-flush-body-3">
        <span>Edges</span>
        <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
        </svg>
      </button>
    </h2>
    <div id="accordion-flush-body-3" class="hidden" aria-labelledby="accordion-flush-heading-3">
      <pre>{{ edges }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue'
import * as vNG from "v-network-graph";
import dagre from "dagre/dist/dagre.min.js"
import {useFlowbite} from "~/composables/useFlowbite";
import {Drawer} from "flowbite";

const drawerRef = useTemplateRef('drawerNodeInfo')
const drawer = ref(null)
const nodeInfo = ref({})

onMounted(() => {
  useFlowbite(() => {
    initFlowbite();
  })
  drawer.value = new Drawer(drawerRef.value,
      {
        placement: 'right',
        backdrop: true,
        bodyScrolling: true,
        edge: false,
        edgeOffset: '',
        backdropClasses:
            'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-30',
        onHide: () => {
          nodeInfo.value = {}
        },
        onShow: () => {
          console.log('drawer is shown');
        },
        onToggle: () => {
          console.log('drawer has been toggled');
        },
      },
      {
        id: 'drawer-node-info',
        override: true
      });
  drawer.value.hide()
})

const sourceData = ref(null)
const fileContent = ref(null)

const nodes = ref({})
const edges = ref({})
const layouts = ref({ nodes: {} })

const graph = ref<vNG.VNetworkGraphInstance>()

const nodeSize = 40

const configs = reactive(
    vNG.defineConfigs<Node, Edge>({
      view: {
        autoPanAndZoomOnLoad: "center-content",
        boxSelectionEnabled: false,
        selection: {
          box: {
            color: "#C4F1BE20",
            strokeWidth: 1,
            strokeColor: "#C4F1BE",
            strokeDasharray: "0",
          },
        },
      },
      node: {
        normal: {
          type: node => node.type,
          width: node => node.width,
          height: node => node.height,
          radius: node => node.size, // Use the value of each node object
          color: node => node.color,
        },
        hover: {
          radius: node => node.size + 1,
          color: node => node.color,
        },
        selectable: true,
        label: {
          visible: true,  //node => !!node.label,
          directionAutoAdjustment: true
        },
        focusring: {
          color: "darkgray",
          width: 2,
          padding: 2
        },
        label: {
          color: "#525b76",
        }
      },
      edge: {
        normal: {
          width: 2, // Use the value of each edge object
          color: edge => edge.color,
          dasharray: edge => (edge.animate ? "4" : "0"),
          animate: edge => edge.animate
        },
        hover: {
          color: "#C4F1BE"
        },
        selectable: true,
        label: {
          color: "#525b76",
        },
        selected: {
          color: "#a2c3a4",
        },
        marker: {
          target: {
            type: "arrow",
            width: 4,
            height: 4,
          },
        }
      },
    })
)

function startBoxSelection() {
  graph.value?.startBoxSelection()
}

function layout(direction: "LR" | "TB") {
  // if (Object.keys(nodes).length <= 1 || Object.keys(edges).length == 0) {
  //   return
  // }

  // convert graph
  // ref: https://github.com/dagrejs/dagre/wiki
  const g = new dagre.graphlib.Graph()
  // Set an object for the graph label
  g.setGraph({
    rankdir: direction,
    nodesep: nodeSize * 2,
    edgesep: nodeSize,
    ranksep: nodeSize * 2,
    acyclicer: "greedy",
    align: "UL"
  })
  // Default to assigning a new object as a label for each new edge.
  g.setDefaultEdgeLabel(() => ({}))

  // Add nodes to the graph. The first argument is the node id. The second is
  // metadata about the node. In this case we're going to add labels to each of
  // our nodes.
  Object.entries(nodes.value).forEach(([nodeId, node]) => {
    g.setNode(nodeId, { label: node.name, width: nodeSize, height: nodeSize })
  })

  // Add edges to the graph.
  Object.values(edges.value).forEach(edge => {
    g.setEdge(edge.source, edge.target)
  })

  dagre.layout(g)

  g.nodes().forEach((nodeId: string) => {
    // update node position
    const x = g.node(nodeId).x
    const y = g.node(nodeId).y
    layouts.value.nodes[nodeId] = { x, y }
  })
}

const prepareData = (sourceJson) => {
  edges.value = createEdges(sourceJson)
  nodes.value = convertJsonStructure(sourceJson)
  layout("TB")
}

const handleFileChange = (event) => {
  sourceData.value = event.target.files[0]
}

const loadSample = async () => {
  const file = await fetch('/definitions-sample.json')
  fileContent.value = await file.json()
  prepareData(fileContent.value)
}

const handleFileUpload = async () => {
  if (!sourceData.value) {
    alert("Please select a file or load the sample.")
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      fileContent.value = JSON.parse(e.target.result)
      prepareData(fileContent.value)
    } catch (error) {
      alert("Failed to parse JSON file.")
      console.error("Error parsing JSON:", error)
    }
  }
  reader.readAsText(sourceData.value)
}

const convertJsonStructure = (data) => {
  const result = {}
  data.exchanges.forEach(exchange => {
    const key = "e_" + exchange.name.replace(/\./g, '_')
    const sourceReference = { nodePath: "exchanges.name", nodeValue: exchange.name }
    const metadata = { kind: "exchange", sourceReference : sourceReference }
    result[key] = { name: exchange.name, size: 10, color: "#201E50", type: "rect", width: 25, height: 25, icon: "&#xe328", metadata: metadata, attributes: exchange }
  })
  data.queues.forEach(queue => {
    const key = "q_" + queue.name.replace(/\./g, '_')
    const sourceReference = { nodePath: "queues.name", nodeValue: queue.name }
    const metadata = { kind: "queue", sourceReference : sourceReference }
    result[key] = { name: queue.name,  size: 5, color: "#869D96", type: "rect", width: 45, height: 15, metadata: metadata, attributes: queue }
  })
  return result
}

const createEdges = (data) => {
  const result = {}
  data.bindings.forEach(binding => {
    let source = "e_" + binding.source.replace(/\./g, '_');
    let target = "q_" + binding.destination.replace(/\./g, '_');
    const key = source + "_" + target
    result[key] = { source: source, target: target, color: "#525B76", label: binding.routing_key }
  })
  return result
}

const eventHandlers: vNG.EventHandlers = {
  "node:pointerover": ({ node }) => {
    for (const key in edges.value) {
      if (edges.value[key].source === node || edges.value[key].target === node ) {
        edges.value[key].color = "#525B76"
        edges.value[key].animate = true
      }
    }
  },
  "node:pointerout": ({ node }) => {
    for (const key in edges.value) {
      edges.value[key].color = "#525B76"
      edges.value[key].animate = false
      }
  },
  "node:dblclick":  ({ node }) => {
    console.dir(nodes.value[node])
    nodeInfo.value = nodes.value[node]
    drawer.value.toggle()
  }
}

</script>

<style scoped>
.graph {
  width: 100%;
  height: 50em;
  border: 1px solid #525b76;
}
</style>
