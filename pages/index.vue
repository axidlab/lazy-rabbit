<template>
  <div>
    <form @submit.prevent="handleFileUpload">
      <input @change="handleFileChange"  accept="application/json" class="text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file">
      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm ml-1 px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Show topology</button>
      or
      <button type="button" v-on:click="loadSample" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Load sample</button>
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
import { useFlowbite } from '~/composables/useFlowbite';

const selectedFile = ref(null)
const fileContent = ref(null)

const nodes = ref({})
const edges = ref({})
const layouts = ref({ nodes: {} })

const graph = ref<vNG.VNetworkGraphInstance>()

const nodeSize = 40

onMounted(() => {
  useFlowbite(() => {
    initFlowbite();
  })
})

const configs = reactive(
    vNG.defineConfigs<Node, Edge>({
      view: {
        autoPanAndZoomOnLoad: "center-content",
        boxSelectionEnabled: false,
        selection: {
          box: {
            color: "#0000ff20",
            strokeWidth: 1,
            strokeColor: "#aaaaff",
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
      },
      edge: {
        normal: {
          width: 2, // Use the value of each edge object
          color: edge => edge.color,
          // dasharray: edge => (edge.dashed ? "4" : "0"),
        },
        selectable: true,
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
  selectedFile.value = event.target.files[0]
}

const loadSample = async () => {
  const file = await fetch('/definitions-sample.json')
  fileContent.value = await file.json()
  prepareData(fileContent.value)
}

const handleFileUpload = async () => {
  if (!selectedFile.value) {
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
  reader.readAsText(selectedFile.value)
}

const convertJsonStructure = (data) => {
  const result = {}
  data.exchanges.forEach(exchange => {
    const key = "e_" + exchange.name.replace(/\./g, '_')
    result[key] = { kind: "exchange",  name: exchange.name, size: 10, color: "hotpink", type: "rect", width: 25, height: 25, icon: "&#xe328" }
  })
  data.queues.forEach(queue => {
    const key = "q_" + queue.name.replace(/\./g, '_')
    result[key] = { kind: "queue", name: queue.name,  size: 5, color: "green", type: "rect", width: 45, height: 15 }
  })
  return result
}

const createEdges = (data) => {
  const result = {}
  data.bindings.forEach(binding => {
    let source = "e_" + binding.source.replace(/\./g, '_');
    let target = "q_" + binding.destination.replace(/\./g, '_');
    const key = source + "_" + target
    result[key] = { source: source, target: target, color: "grey", label: binding.routing_key }
  })
  return result
}

const eventHandlers: vNG.EventHandlers = {
  "node:pointerover": ({ node }) => {
    for (const key in edges.value) {
      if (edges.value[key].source === node || edges.value[key].target === node ) {
        edges.value[key].color = "blue"
      }
    }
  },
  "node:pointerout": ({ node }) => {
    for (const key in edges.value) {
        edges.value[key].color = "grey"
      }
  },
}

</script>

<style scoped>
.graph {
  width: 100%;
  height: 50em;
  border: 1px solid #ddd;
}

</style>