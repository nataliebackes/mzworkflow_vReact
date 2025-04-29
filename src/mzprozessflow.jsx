import React, { useState } from "react";
import ReactFlow, { Background, Controls, MarkerType } from "reactflow";
import "reactflow/dist/style.css";

// Vollständige Daten und Grid hier einfügen
const data = {
  "MFB von Herter": { typ: "lieferung", abhaengig_von: [] },
  Fragebögen: { typ: "lieferung", abhaengig_von: [] },
  "Ziel DSB von Destatis": { typ: "lieferung", abhaengig_von: [] },
  "Variste prüf": { typ: "lieferung", abhaengig_von: [] },
  Metadatenreport: { typ: "lieferung", abhaengig_von: [] },
  Testdaten: { typ: "lieferung", abhaengig_von: [] },
  "MFB Spalten A-M + Operatoren": {
    typ: "zwischenschritt",
    abhaengig_von: ["MFB von Herter", "Fragebögen"],
  },
  "MFB mit Spalten P-Q": { typ: "lieferung", abhaengig_von: [] },
  "Vergröberungen + Korrekturen": {
    typ: "zwischenschritt",
    abhaengig_von: ["Variste prüf"],
  },
  "Metadatenreport final": {
    typ: "endprodukt",
    abhaengig_von: ["Metadatenreport"],
  },
  "Inhaltliche Prüfung": {
    typ: "endprodukt",
    abhaengig_von: ["Testdaten", "Fachserien Tabellen vorbereiten"],
  },
  Missingdefinitionen: { typ: "zwischenschritt", abhaengig_von: ["Testdaten"] },
  "Missy Texte": { typ: "zwischenschritt", abhaengig_von: ["Testdaten"] },
  "Schlüsselverzeichnis und IHB": { typ: "lieferung", abhaengig_von: [] },
  "Ziel DSB": {
    typ: "endprodukt",
    abhaengig_von: [
      "Ziel DSB von Destatis",
      "MFB mit Spalten P-Q",
      "Fragebögen",
      "Schlüsselverzeichnis und IHB",
    ],
  },
  "DHB Kommentare 2": {
    typ: "zwischenschritt",
    abhaengig_von: ["Vergröberungen + Korrekturen"],
  },
  "Tabelle Erhebungsprogramme": {
    typ: "endprodukt",
    abhaengig_von: ["Metadatenreport"],
  },
  "Technische Prüfung": { typ: "endprodukt", abhaengig_von: ["Testdaten"] },
  Tools: { typ: "zwischenschritt", abhaengig_von: ["Testdaten"] },
  "Missy Veröffentlichung": {
    typ: "endprodukt",
    abhaengig_von: ["Missy Variablenmatrix", "Missy Texte"],
  },
  MFB: {
    typ: "endprodukt",
    abhaengig_von: [
      "MFB mit Spalten P-Q",
      "Schlüsselverzeichnis und IHB",
      "Ziel DSB",
    ],
  },
  DHB: {
    typ: "endprodukt",
    abhaengig_von: ["Testdaten", "DHB Kommentare 2", "DHB Kommentare 1"],
  },
  "Missy Variablenmatrix": {
    typ: "endprodukt",
    abhaengig_von: ["ZP Matrix + Thematische Liste"],
  },
  "DHB Kommentare 1": { typ: "zwischenschritt", abhaengig_von: ["MFB"] },
  "Routinen für Filtermissings an IT NRW": {
    typ: "zwischenschritt",
    abhaengig_von: ["MFB", "Ziel DSB"],
  },
  "ZP Matrix + Thematische Liste": {
    typ: "endprodukt",
    abhaengig_von: ["Ziel DSB"],
  },
  "Fachserien Tabellen vorbereiten": {
    typ: "zwischenschritt",
    abhaengig_von: [],
  },
};

const grid = [
  [
    "MFB von Herter",
    "Fragebögen",
    "Ziel DSB von Destatis",
    "Variste prüf",
    "Metadatenreport",
    "Testdaten",
    "Testdaten",
    "",
  ],
  [
    "MFB Spalten A-M + Operatoren",
    "MFB mit Spalten P-Q",
    "",
    "Vergröberungen + Korrekturen",
    "Metadatenreport final",
    "Inhaltliche Prüfung",
    "Missingdefinitionen",
    "Missy Texte",
  ],
  [
    "",
    "Schlüsselverzeichnis und IHB",
    "Ziel DSB",
    "DHB Kommentare 2",
    "Tabelle Erhebungsprogramme",
    "Technische Prüfung",
    "Tools",
    "Missy Veröffentlichung",
  ],
  ["MFB", "", "", "", "", "DHB", "", "Missy Variablenmatrix"],
  [
    "DHB Kommentare 1",
    "Routinen für Filtermissings an IT NRW",
    "ZP Matrix + Thematische Liste",
    "",
    "",
    "",
    "",
    "",
  ],
  ["", "Fachserien Tabellen vorbereiten", "", "", "", "", "", ""],
];

const typeColors = {
  lieferung: "#7e57c2",
  zwischenschritt: "#81d4fa",
  endprodukt: "#26c6da",
};
const spacingX = 200;
const spacingY = 180;

const defaultEdgeOptions = {
  markerEnd: {
    type: MarkerType.ArrowClosed,
  },
};

function CustomNode({ data }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      draggable={false}
      style={{
        backgroundColor: typeColors[data.typ],
        padding: 12,
        borderRadius: 16,
        color: "#fff",
        width: 140,
        height: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontSize: 14,
        fontWeight: "600",
        boxShadow: hover
          ? "0 8px 14px rgba(0,0,0,0.25)"
          : "0 6px 10px rgba(0,0,0,0.2)",
        transform: hover ? "translateY(-2px)" : "translateY(0)",
        transition: "all 0.15s ease",
        cursor: "pointer",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => alert(`Knoten: ${data.label}`)}
    >
      {data.label}
    </div>
  );
}

const nodeTypes = { custom: CustomNode };

const nodes = [];
grid.forEach((row, rowIndex) => {
  row.forEach((name, colIndex) => {
    if (name && data[name]) {
      nodes.push({
        id: name,
        type: "custom",
        position: { x: colIndex * spacingX, y: rowIndex * spacingY },
        data: { label: name, typ: data[name].typ },
      });
    }
  });
});

const edges = Object.entries(data).flatMap(([target, val]) =>
  val.abhaengig_von.map((source, index, arr) => {
    const offset = (index - (arr.length - 1) / 2) * 10; // symmetrisch um die Mitte
    return {
      id: `${source}->${target}-${index}`,
      source,
      target,
      type: "bezier", // bezier erlaubt Kurven
      markerEnd: {
        type: "arrowclosed",
        color: "#555",
      },
      style: {
        stroke: "#555",
        strokeWidth: 2,
      },
      data: {
        offset,
      },
    };
  })
);

export default function FlowChart() {
  const [selectedNode, setSelectedNode] = useState(null);
  const nodes = grid.flatMap((row, rowIndex) =>
    row
      .map((name, colIndex) => {
        if (!name || !data[name]) return null;

        const isDependency =
          selectedNode && data[selectedNode]?.abhaengig_von.includes(name);

        const isSelected = selectedNode === name;

        return {
          id: name,
          position: { x: colIndex * spacingX, y: rowIndex * spacingY },
          data: { label: name },
          style: {
            backgroundColor: isDependency
              ? "#ffeb3b"
              : typeColors[data[name].typ],
            color: "#fff",
            padding: 12,
            borderRadius: 16,
            width: 140,
            height: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            fontSize: 14,
            fontWeight: "600",
            boxShadow: isSelected
              ? "0 8px 16px rgba(0,0,0,0.3)"
              : "0 6px 10px rgba(0,0,0,0.2)",
            border: isSelected ? "3px solid #fff" : "none",
            cursor: "pointer",
            zIndex: 10,
          },
        };
      })
      .filter(Boolean)
  );
  const edges = Object.entries(data).flatMap(([target, val]) =>
    val.abhaengig_von.map((source, idx) => ({
      id: `${source}->${target}-${idx}`,
      source,
      target,
      type: "smoothstep",
      style:
        selectedNode === target ? { stroke: "#ffeb3b", strokeWidth: 3 } : {},
    }))
  );
  return (
    <div style={{ width: "100%", height: "1200px" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodeClick={(event, node) => setSelectedNode(node.id)}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
