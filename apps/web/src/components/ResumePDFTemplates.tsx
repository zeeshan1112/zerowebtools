import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { ResumeData, ResumeItem, SkillItem } from './resume-types';

// Register fonts
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZJhjp-Ek-_EeA.woff' }, // Regular
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZJhjp-Ek-_EeA.woff', fontWeight: 500 }, // Medium
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZJhjp-Ek-_EeA.woff', fontWeight: 700 }, // Bold
  ]
});

const s = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    fontFamily: 'Inter',
    fontSize: 10,
    lineHeight: 1.5,
    color: '#1a1a1a',
  },
  section: {
    marginBottom: 12,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 12,
    fontWeight: 500,
    color: '#4b5563',
    marginBottom: 12,
  },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    color: '#4b5563',
    fontSize: 9,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
    marginTop: 8,
    paddingBottom: 2,
  },
  itemBlock: {
    marginBottom: 10,
  },
  itemHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  itemTitle: {
    fontWeight: 700,
    fontSize: 11,
  },
  itemDate: {
    fontSize: 9,
    color: '#6b7280',
  },
  itemSubtitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 10,
    fontWeight: 700,
    color: '#374151',
  },
  itemLocation: {
    fontSize: 9,
    color: '#6b7280',
  },
  itemDescription: {
    paddingLeft: 8,
    borderLeftWidth: 1,
    borderLeftColor: '#e5e7eb',
    color: '#374151',
    fontSize: 9,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bulletPointText: {
    flex: 1,
  },
  skillRow: {
    flexDirection: 'row',
    marginBottom: 2,
    fontSize: 9,
  },
  skillCategory: {
    fontWeight: 700,
    marginRight: 4,
    width: 100,
  },
  skillText: {
    flex: 1,
  }
});

const formatBullets = (text: string) => {
  if (!text) return null;
  return text.split(/(?:\r?\n|\\n)/).filter(Boolean).map((line, i) => {
    const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-');
    const content = line.replace(/^[•-]\s*/, '').trim();
    if (isBullet) {
      return (
        <View key={i} style={s.bulletPoint}>
          <Text style={{ width: 10 }}>•</Text>
          <Text style={s.bulletPointText}>{content}</Text>
        </View>
      );
    }
    return <Text key={i} style={{ marginBottom: 2 }}>{line.trim()}</Text>;
  });
};

const TemplateExecutivePDF = ({ data }: { data: ResumeData }) => {
  const pColor = data.settings.primaryColor;
  
  return (
    <Page size="A4" style={{ ...s.page, padding: 40 }}>
      {/* Header */}
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Text style={{ ...s.headerText, color: pColor }}>{data.personal.fullName}</Text>
        <Text style={s.subHeaderText}>{data.personal.jobTitle}</Text>
        <View style={{ ...s.contactInfo, justifyContent: 'center' }}>
          {data.personal.location && <Text>{data.personal.location}</Text>}
          {data.personal.phone && <Text>• {data.personal.phone}</Text>}
          {data.personal.email && <Text>• {data.personal.email}</Text>}
          {data.personal.website && <Text>• {data.personal.website}</Text>}
          {data.personal.linkedin && <Text>• {data.personal.linkedin}</Text>}
          {data.personal.github && <Text>• {data.personal.github}</Text>}
        </View>
      </View>

      {/* Summary */}
      {data.personal.summary && (
        <View style={s.section}>
          <Text style={{ color: '#1f2937', fontSize: 9 }}>{data.personal.summary}</Text>
        </View>
      )}

      {/* Sections */}
      {data.settings.sectionOrder.map(sec => {
        if (sec === "experience" && data.experience.length > 0) return (
          <View key={sec} style={s.section}>
            <Text wrap={false} minPresenceAhead={60} style={{ ...s.sectionTitle, color: pColor, borderBottomWidth: 1, borderBottomColor: pColor }}>PROFESSIONAL EXPERIENCE</Text>
            {data.experience.map(item => (
              <View key={item.id} style={s.itemBlock}>
                <View wrap={false} minPresenceAhead={40}>
                <View style={s.itemHeaderRow}>
                  <Text style={s.itemTitle}>{item.title}</Text>
                  <Text style={s.itemDate}>{item.dateStart} {item.dateStart && item.dateEnd ? "-" : ""} {item.dateEnd}</Text>
                </View>
                <View style={s.itemSubtitleRow}>
                  <Text style={s.itemSubtitle}>{item.subtitle}</Text>
                  <Text style={s.itemLocation}>{item.location}</Text>
                </View>
                </View>
                <View style={s.itemDescription}>
                  {formatBullets(item.description)}
                </View>
              </View>
            ))}
          </View>
        );

        if (sec === "education" && data.education.length > 0) return (
          <View key={sec} style={s.section}>
            <Text wrap={false} minPresenceAhead={60} style={{ ...s.sectionTitle, color: pColor, borderBottomWidth: 1, borderBottomColor: pColor }}>EDUCATION</Text>
            {data.education.map(item => (
              <View key={item.id} style={s.itemBlock}>
                <View wrap={false} minPresenceAhead={40}>
                <View style={s.itemHeaderRow}>
                  <Text style={s.itemTitle}>{item.title}</Text>
                  <Text style={s.itemDate}>{item.dateStart} {item.dateStart && item.dateEnd ? "-" : ""} {item.dateEnd}</Text>
                </View>
                <View style={s.itemSubtitleRow}>
                  <Text style={s.itemSubtitle}>{item.subtitle}</Text>
                  <Text style={s.itemLocation}>{item.location}</Text>
                </View>
                </View>
                <View style={s.itemDescription}>
                  {formatBullets(item.description)}
                </View>
              </View>
            ))}
          </View>
        );

        if (sec === "projects" && data.projects.length > 0) return (
          <View key={sec} style={s.section}>
            <Text wrap={false} minPresenceAhead={60} style={{ ...s.sectionTitle, color: pColor, borderBottomWidth: 1, borderBottomColor: pColor }}>PROJECTS</Text>
            {data.projects.map(item => (
              <View key={item.id} style={s.itemBlock}>
                <View wrap={false} minPresenceAhead={40}>
                <View style={s.itemHeaderRow}>
                  <Text style={s.itemTitle}>{item.title}</Text>
                  <Text style={s.itemDate}>{item.dateStart} {item.dateStart && item.dateEnd ? "-" : ""} {item.dateEnd}</Text>
                </View>
                <View style={s.itemSubtitleRow}>
                  <Text style={s.itemSubtitle}>{item.subtitle}</Text>
                  <Text style={s.itemLocation}>{item.location}</Text>
                </View>
                </View>
                <View style={s.itemDescription}>
                  {formatBullets(item.description)}
                </View>
              </View>
            ))}
          </View>
        );

        if (sec === "skills" && data.skills.length > 0) return (
          <View key={sec} style={s.section}>
            <Text wrap={false} minPresenceAhead={60} style={{ ...s.sectionTitle, color: pColor, borderBottomWidth: 1, borderBottomColor: pColor }}>TECHNICAL SKILLS</Text>
            {data.skills.map(item => (
              <View key={item.id} style={s.skillRow}>
                <Text style={s.skillCategory}>{item.category}:</Text>
                <Text style={s.skillText}>{item.skills}</Text>
              </View>
            ))}
          </View>
        );
        return null;
      })}
    </Page>
  );
};

const TemplateCreativePDF = ({ data }: { data: ResumeData }) => {
  const pColor = data.settings.primaryColor;
  
  return (
    <Page size="A4" style={{ ...s.page, flexDirection: 'row' }}>
      {/* Sidebar */}
      <View style={{ width: '35%', backgroundColor: pColor, padding: 30, color: '#ffffff' }}>
        {data.personal.photoUrl && (
          <Image src={data.personal.photoUrl} style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 20, alignSelf: 'center' }} />
        )}
        <Text style={{ fontSize: 20, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12 }}>{data.personal.fullName}</Text>
        <Text style={{ fontSize: 10, opacity: 0.8, marginBottom: 35 }}>{data.personal.jobTitle}</Text>

        <View style={{ marginBottom: 30, gap: 8, fontSize: 9, opacity: 0.9 }}>
          {data.personal.location && <Text>📍 {data.personal.location}</Text>}
          {data.personal.phone && <Text>📞 {data.personal.phone}</Text>}
          {data.personal.email && <Text>✉️ {data.personal.email}</Text>}
          {data.personal.website && <Text>🌐 {data.personal.website}</Text>}
          {data.personal.linkedin && <Text>🔗 {data.personal.linkedin}</Text>}
          {data.personal.github && <Text>💻 {data.personal.github}</Text>}
        </View>

        {data.skills.length > 0 && (
          <View>
            <Text style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.2)', paddingBottom: 4, marginBottom: 10 }}>SKILLS</Text>
            {data.skills.map(item => (
              <View key={item.id} style={{ marginBottom: 12 }}>
                <Text style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>{item.category}</Text>
                <Text style={{ fontSize: 9, opacity: 0.9, lineHeight: 1.4 }}>{item.skills.split(',').map(s => s.trim()).join(' • ')}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Main Content */}
      <View style={{ width: '65%', padding: 30, backgroundColor: '#ffffff' }}>
        {data.personal.summary && (
          <View style={s.section}>
            <View minPresenceAhead={60} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <View style={{ width: 30, height: 2, backgroundColor: pColor, marginRight: 8 }}></View>
              <Text style={{ fontSize: 14, fontWeight: 700, color: pColor, textTransform: 'uppercase', letterSpacing: 1 }}>PROFILE</Text>
            </View>
            <Text style={{ fontSize: 9, color: '#4b5563', lineHeight: 1.6 }}>{data.personal.summary}</Text>
          </View>
        )}

        {data.settings.sectionOrder.filter(sec => sec !== "skills").map(sec => {
          if (sec === "experience" && data.experience.length > 0) return (
            <View key={sec} style={{ marginTop: 10 }}>
              <View minPresenceAhead={60} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <View style={{ width: 30, height: 2, backgroundColor: pColor, marginRight: 8 }}></View>
                <Text style={{ fontSize: 14, fontWeight: 700, color: pColor, textTransform: 'uppercase', letterSpacing: 1 }}>EXPERIENCE</Text>
              </View>
              {data.experience.map(item => (
                <View key={item.id} style={s.itemBlock}>
                  <View wrap={false} minPresenceAhead={40}>
                  <View style={s.itemHeaderRow}>
                    <Text style={s.itemTitle}>{item.title}</Text>
                    <Text style={s.itemDate}>{item.dateStart} {item.dateStart && item.dateEnd ? "-" : ""} {item.dateEnd}</Text>
                  </View>
                  <View style={s.itemSubtitleRow}>
                    <Text style={s.itemSubtitle}>{item.subtitle}</Text>
                    <Text style={s.itemLocation}>{item.location}</Text>
                  </View>
                  </View>
                  <View style={{ color: '#4b5563', fontSize: 9 }}>
                    {formatBullets(item.description)}
                  </View>
                </View>
              ))}
            </View>
          );

          if (sec === "education" && data.education.length > 0) return (
            <View key={sec} style={{ marginTop: 10 }}>
              <View minPresenceAhead={60} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <View style={{ width: 30, height: 2, backgroundColor: pColor, marginRight: 8 }}></View>
                <Text style={{ fontSize: 14, fontWeight: 700, color: pColor, textTransform: 'uppercase', letterSpacing: 1 }}>EDUCATION</Text>
              </View>
              {data.education.map(item => (
                <View key={item.id} style={s.itemBlock}>
                  <View wrap={false} minPresenceAhead={40}>
                  <View style={s.itemHeaderRow}>
                    <Text style={s.itemTitle}>{item.title}</Text>
                    <Text style={s.itemDate}>{item.dateStart} {item.dateStart && item.dateEnd ? "-" : ""} {item.dateEnd}</Text>
                  </View>
                  <View style={s.itemSubtitleRow}>
                    <Text style={s.itemSubtitle}>{item.subtitle}</Text>
                    <Text style={s.itemLocation}>{item.location}</Text>
                  </View>
                  </View>
                  <View style={{ color: '#4b5563', fontSize: 9 }}>
                    {formatBullets(item.description)}
                  </View>
                </View>
              ))}
            </View>
          );

          if (sec === "projects" && data.projects.length > 0) return (
            <View key={sec} style={{ marginTop: 10 }}>
              <View minPresenceAhead={60} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <View style={{ width: 30, height: 2, backgroundColor: pColor, marginRight: 8 }}></View>
                <Text style={{ fontSize: 14, fontWeight: 700, color: pColor, textTransform: 'uppercase', letterSpacing: 1 }}>PROJECTS</Text>
              </View>
              {data.projects.map(item => (
                <View key={item.id} style={s.itemBlock}>
                  <View wrap={false} minPresenceAhead={40}>
                  <View style={s.itemHeaderRow}>
                    <Text style={s.itemTitle}>{item.title}</Text>
                    <Text style={s.itemDate}>{item.dateStart} {item.dateStart && item.dateEnd ? "-" : ""} {item.dateEnd}</Text>
                  </View>
                  <View style={s.itemSubtitleRow}>
                    <Text style={s.itemSubtitle}>{item.subtitle}</Text>
                    <Text style={s.itemLocation}>{item.location}</Text>
                  </View>
                  </View>
                  <View style={{ color: '#4b5563', fontSize: 9 }}>
                    {formatBullets(item.description)}
                  </View>
                </View>
              ))}
            </View>
          );

          return null;
        })}
      </View>
    </Page>
  );
};

const TemplateClassicPDF = ({ data }: { data: ResumeData }) => {
  const pColor = data.settings.primaryColor;
  
  return (
    <Page size="A4" style={{ ...s.page, fontFamily: 'Times-Roman', padding: 40 }}>
      {/* Header */}
      <View style={{ alignItems: 'center', marginBottom: 24 }}>
        <Text style={{ fontSize: 26, fontWeight: 700, textTransform: 'uppercase', marginBottom: 16, color: pColor }}>{data.personal.fullName}</Text>
        <View style={{ flexDirection: 'row', gap: 10, fontSize: 10, color: '#374151', flexWrap: 'wrap', justifyContent: 'center' }}>
          {data.personal.location && <Text>{data.personal.location}</Text>}
          {data.personal.phone && <Text>| {data.personal.phone}</Text>}
          {data.personal.email && <Text>| {data.personal.email}</Text>}
          {data.personal.linkedin && <Text>| {data.personal.linkedin}</Text>}
          {data.personal.github && <Text>| {data.personal.github}</Text>}
        </View>
      </View>

      {/* Summary */}
      {data.personal.summary && (
        <View style={{ marginBottom: 20, paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 10, color: '#374151', fontStyle: 'italic', textAlign: 'center', lineHeight: 1.6 }}>{data.personal.summary}</Text>
        </View>
      )}

      {/* Sections */}
      {data.settings.sectionOrder.map(sec => {
        if (sec === "experience" && data.experience.length > 0) return (
          <View key={sec} style={s.section}>
            <Text wrap={false} minPresenceAhead={60} style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#000', textAlign: 'center', paddingVertical: 4, marginBottom: 12 }}>EXPERIENCE</Text>
            {data.experience.map(item => (
              <View key={item.id} style={{ marginBottom: 12 }}>
                <View wrap={false} minPresenceAhead={40}>
                <View style={s.itemHeaderRow}>
                  <Text style={{ fontSize: 11, fontWeight: 700 }}>{item.subtitle}</Text>
                  <Text style={s.itemLocation}>{item.location}</Text>
                </View>
                <View style={s.itemSubtitleRow}>
                  <Text style={{ fontSize: 10, fontStyle: 'italic', color: '#111' }}>{item.title}</Text>
                  <Text style={s.itemDate}>{item.dateStart} - {item.dateEnd}</Text>
                </View>
                </View>
                <View style={{ fontSize: 10, color: '#111', paddingLeft: 10 }}>
                  {formatBullets(item.description)}
                </View>
              </View>
            ))}
          </View>
        );

        if (sec === "education" && data.education.length > 0) return (
          <View key={sec} style={s.section}>
            <Text wrap={false} minPresenceAhead={60} style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#000', textAlign: 'center', paddingVertical: 4, marginBottom: 12 }}>EDUCATION</Text>
            {data.education.map(item => (
              <View key={item.id} style={{ marginBottom: 12 }}>
                <View wrap={false} minPresenceAhead={40}>
                <View style={s.itemHeaderRow}>
                  <Text style={{ fontSize: 11, fontWeight: 700 }}>{item.subtitle}</Text>
                  <Text style={s.itemLocation}>{item.location}</Text>
                </View>
                <View style={s.itemSubtitleRow}>
                  <Text style={{ fontSize: 10, fontStyle: 'italic', color: '#111' }}>{item.title}</Text>
                  <Text style={s.itemDate}>{item.dateStart} - {item.dateEnd}</Text>
                </View>
                </View>
                <View style={{ fontSize: 10, color: '#111', paddingLeft: 10 }}>
                  {formatBullets(item.description)}
                </View>
              </View>
            ))}
          </View>
        );

        if (sec === "projects" && data.projects.length > 0) return (
          <View key={sec} style={s.section}>
            <Text wrap={false} minPresenceAhead={60} style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#000', textAlign: 'center', paddingVertical: 4, marginBottom: 12 }}>PROJECTS</Text>
            {data.projects.map(item => (
              <View key={item.id} style={{ marginBottom: 12 }}>
                <View wrap={false} minPresenceAhead={40}>
                <View style={s.itemHeaderRow}>
                  <Text style={{ fontSize: 11, fontWeight: 700 }}>{item.subtitle}</Text>
                  <Text style={s.itemLocation}>{item.location}</Text>
                </View>
                <View style={s.itemSubtitleRow}>
                  <Text style={{ fontSize: 10, fontStyle: 'italic', color: '#111' }}>{item.title}</Text>
                  <Text style={s.itemDate}>{item.dateStart} - {item.dateEnd}</Text>
                </View>
                </View>
                <View style={{ fontSize: 10, color: '#111', paddingLeft: 10 }}>
                  {formatBullets(item.description)}
                </View>
              </View>
            ))}
          </View>
        );

        if (sec === "skills" && data.skills.length > 0) return (
          <View key={sec} style={s.section}>
            <Text wrap={false} minPresenceAhead={60} style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#000', textAlign: 'center', paddingVertical: 4, marginBottom: 12 }}>SKILLS</Text>
            {data.skills.map(item => (
              <View key={item.id} style={{ flexDirection: 'row', marginBottom: 4, fontSize: 10 }}>
                <Text style={{ fontWeight: 700, width: 120 }}>{item.category}:</Text>
                <Text style={{ flex: 1 }}>{item.skills}</Text>
              </View>
            ))}
          </View>
        );
        return null;
      })}
    </Page>
  );
};


export const ResumeDocument = ({ data }: { data: ResumeData }) => {
  return (
    <Document key={data.settings.sectionOrder.join(',')} title={`${data.personal.fullName.replace(/\s+/g, '_')}_Resume`} author={data.personal.fullName}>
      {data.settings.template === "executive" && <TemplateExecutivePDF data={data} />}
      {data.settings.template === "creative" && <TemplateCreativePDF data={data} />}
      {data.settings.template === "classic" && <TemplateClassicPDF data={data} />}
    </Document>
  );
};
