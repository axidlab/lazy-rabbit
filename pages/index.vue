<template>
  <h1>Lazy Rabbit - Topology Visualizer</h1>
  <div>
    <form @submit.prevent="handleFileUpload">
      <input type="file" accept=".json" @change="handleFileChange" />
      <button type="submit">Upload</button>
    </form>
  </div>
  <v-network-graph
      class="graph"
      :nodes="nodes"
      :edges="edges"
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
//import from "v-network-graph"
import { Nodes, Edges, Layouts } from "v-network-graph"
import {reactive, ref} from 'vue'
import * as vNG from "v-network-graph";

const selectedFile = ref(null)
const fileContent = ref(null)

const nodes = ref({})
const edges = ref({})
const layouts = ref({})


const configs = reactive(
    vNG.defineConfigs<Node, Edge>({
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
          width: edge => edge.width, // Use the value of each edge object
          color: edge => edge.color,
          dasharray: edge => (edge.dashed ? "4" : "0"),
        },
      },
    })
)

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
    result[key] = { name: exchange.name, size: 20, color: 'hotpink' }
  })
  data.queues.forEach(queue => {
    const key = "q_" + queue.name.replace(/\./g, '_')
    result[key] = { name: queue.name,  size: 16, color: 'blue' }
  })
  return result
}

const createEdges = (data) => {
  const result = {}
  data.bindings.forEach(binding => {
    let source = binding.source.replace(/\./g, '_');
    let target = "q_" + binding.destination.replace(/\./g, '_');
    const key = source + "_" + target
    result[key] = { source: source, target: target, color: 'black' }
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