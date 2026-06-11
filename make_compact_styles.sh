#!/bin/bash
set -e
FILE="apps/web/src/components/ResumePDFTemplates.tsx"

# Change const s = StyleSheet.create({ to const getStyles = (isCompact?: boolean) => StyleSheet.create({
sed -i '' 's/const s = StyleSheet.create({/const getStyles = (isCompact?: boolean) => StyleSheet.create({/g' $FILE

# Add const s = getStyles(data.settings.isCompact); inside each Template component
sed -i '' '/const pColor = data.settings.primaryColor;/a\
  const s = getStyles(data.settings.isCompact);
' $FILE

# Replace the static margins in getStyles
# We only want to replace it within getStyles, but doing it globally is okay since other inline styles also benefit from isCompact shrinking
sed -i '' 's/marginBottom: 12/marginBottom: isCompact ? 6 : 12/g' $FILE
sed -i '' 's/marginBottom: 10/marginBottom: isCompact ? 5 : 10/g' $FILE
sed -i '' 's/marginBottom: 8/marginBottom: isCompact ? 4 : 8/g' $FILE
sed -i '' 's/padding: 30/padding: isCompact ? 15 : 30/g' $FILE
sed -i '' 's/lineHeight: 1.5/lineHeight: isCompact ? 1.2 : 1.5/g' $FILE

# For inline styles in Elegant and Creative that use data.settings.isCompact because they are not inside getStyles
sed -i '' 's/marginBottom: 15/marginBottom: data.settings.isCompact ? 8 : 15/g' $FILE
sed -i '' 's/marginBottom: 6/marginBottom: data.settings.isCompact ? 2 : 6/g' $FILE
sed -i '' 's/paddingTop: 40/paddingTop: data.settings.isCompact ? 20 : 40/g' $FILE
sed -i '' 's/paddingBottom: 40/paddingBottom: data.settings.isCompact ? 20 : 40/g' $FILE
sed -i '' 's/padding: 40/padding: data.settings.isCompact ? 20 : 40/g' $FILE
sed -i '' 's/marginHorizontal: -40/marginHorizontal: data.settings.isCompact ? -20 : -40/g' $FILE
sed -i '' 's/marginTop: -40/marginTop: data.settings.isCompact ? -20 : -40/g' $FILE
sed -i '' 's/paddingHorizontal: 40/paddingHorizontal: data.settings.isCompact ? 20 : 40/g' $FILE
sed -i '' 's/lineHeight: 1.4/lineHeight: data.settings.isCompact ? 1.2 : 1.4/g' $FILE

