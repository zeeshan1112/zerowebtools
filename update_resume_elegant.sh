#!/bin/bash
set -e

# 1. Update resume-types.ts
sed -i '' 's/"executive" | "creative" | "classic"/"executive" | "creative" | "classic" | "elegant"/g' apps/web/src/components/resume-types.ts

# 2. Update ResumeBuilderWorkspace.tsx
sed -i '' 's/{ id: "classic", name: "Classic" }/{ id: "classic", name: "Classic" }, { id: "elegant", name: "Elegant" }/g' apps/web/src/components/ResumeBuilderWorkspace.tsx

