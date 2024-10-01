<template>
  <h1>Lazy Rabbit - Topology Visualizer</h1>
  <div>
    <form @submit.prevent="handleFileUpload">
      <input type="file" accept=".json" @change="handleFileChange" />
      <button type="submit">Show topology</button>
    </form>
  </div>
  <v-network-graph
      class="graph"
      ref="graph"
      :nodes="nodes"
      :edges="edges"
      :layouts="layouts"
      :configs="configs"
  />
  <div>
    <h3>Source</h3>
    <pre>{{ fileContent }}</pre>
  </div>
  <hr />
  <div>
    <h3>Nodes</h3>
    <pre>{{ nodes }}</pre>
  </div>
  <hr />
  <div>
    <h3>Edges</h3>
    <pre>{{ edges }}</pre>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue'
import * as vNG from "v-network-graph";
// dagre: Directed graph layout for JavaScript
// https://github.com/dagrejs/dagre
//@ts-ignore
import dagre from "dagre/dist/dagre.min.js"

const selectedFile = ref(null)
const fileContent = ref(null)

const nodes = ref({})
const edges = ref({})
const layouts = ref({ nodes: {} })

const graph = ref<vNG.VNetworkGraphInstance>()

const nodeSize = 40


const configs = reactive(
    vNG.defineConfigs<Node, Edge>({
      view: {
        autoPanAndZoomOnLoad: "fit-content",
      },
      node: {
        normal: {
          type: "circle",
          radius: node => node.size, // Use the value of each node object
          color: node => node.color,
        },
        hover: {
          radius: node => node.size + 1,
          color: node => node.color,
        },
        selectable: false,
        label: {
          visible: true,  //node => !!node.label,
        },
        focusring: {
          color: "darkgray",
        },
      },
      edge: {
        normal: {
          width: 2, // Use the value of each edge object
          color: edge => edge.color,
          // dasharray: edge => (edge.dashed ? "4" : "0"),
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

const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0]
}

const handleFileUpload = async () => {
  if (!selectedFile.value) {
    alert("Please select a file first.")
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      fileContent.value = JSON.parse(e.target.result)

      edges.value = createEdges(fileContent.value)
      nodes.value = convertJsonStructure(fileContent.value)
      layout("TB")
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
    const key = exchange.name.replace(/\./g, '_')
    result[key] = { name: exchange.name, size: 20, color: "hotpink" }
  })
  data.queues.forEach(queue => {
    const key = "q_" + queue.name.replace(/\./g, '_')
    result[key] = { name: queue.name,  size: 16, color: "blue" }
  })
  return result
}

const createEdges = (data) => {
  const result = {}
  data.bindings.forEach(binding => {
    let source = binding.source.replace(/\./g, '_');
    let target = "q_" + binding.destination.replace(/\./g, '_');
    const key = source + "_" + target
    result[key] = { source: source, target: target, color: "grey" }
  })
  return result
}

</script>

<style scoped>
.graph {
  width: 100%;
  height: 50em;
  border: 1px solid #000;
}
</style>