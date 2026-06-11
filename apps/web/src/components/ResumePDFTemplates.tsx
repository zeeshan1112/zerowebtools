import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image, Svg, Path } from '@react-pdf/renderer';
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
        <Text style={{ fontSize: 20, fontWeight: 700, textTransform: 'uppercase', marginBottom: 12 }}>{data.personal.fullName}</Text>
        <Text style={{ fontSize: 10, opacity: 0.8, marginBottom: 35 }}>{data.personal.jobTitle}</Text>

        <View style={{ marginBottom: 30, gap: 12, fontSize: 9, opacity: 0.9 }}>
          {data.personal.location && (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Svg viewBox="0 0 24 24" width={10} height={10}><Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="white" /></Svg>
              <Text>{data.personal.location}</Text>
            </View>
          )}
          {data.personal.phone && (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Svg viewBox="0 0 24 24" width={10} height={10}><Path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="white" /></Svg>
              <Text>{data.personal.phone}</Text>
            </View>
          )}
          {data.personal.email && (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Svg viewBox="0 0 24 24" width={10} height={10}><Path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="white" /></Svg>
              <Text>{data.personal.email}</Text>
            </View>
          )}
          {data.personal.website && (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Svg viewBox="0 0 24 24" width={10} height={10}><Path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" fill="white" /></Svg>
              <Text>{data.personal.website}</Text>
            </View>
          )}
          {data.personal.linkedin && (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Svg viewBox="0 0 24 24" width={10} height={10}><Path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" fill="white" /></Svg>
              <Text>{data.personal.linkedin}</Text>
            </View>
          )}
          {data.personal.github && (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Svg viewBox="0 0 24 24" width={10} height={10}><Path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" fill="white" /></Svg>
              <Text>{data.personal.github}</Text>
            </View>
          )}
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

const TemplateElegantPDF = ({ data }: { data: ResumeData }) => {
  const pColor = data.settings.primaryColor;
  
  return (
    <Page size="A4" style={{ ...s.page, fontFamily: 'Times-Roman', padding: 40, paddingTop: 40, paddingBottom: 40 }}>
      {/* Header */}
      <View style={{ backgroundColor: pColor, marginHorizontal: -40, marginTop: -40, marginBottom: 30, paddingVertical: 35, paddingHorizontal: 40, alignItems: 'center' }}>
        <View style={{ width: 40, height: 1, backgroundColor: '#ffffff', marginBottom: 15, opacity: 0.6 }}></View>
        <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#ffffff', marginBottom: 12, fontFamily: 'Times-Bold', lineHeight: 1.1 }}>
          {data.personal.fullName}
        </Text>
        <Text style={{ fontSize: 9, color: '#ffffff', opacity: 0.9 }}>
          {[data.personal.location, data.personal.phone, data.personal.email, data.personal.website].filter(Boolean).join('  |  ')}
        </Text>
      </View>

      {/* Body */}
      <View style={{ paddingTop: 0 }}>
        {data.settings.sectionOrder.map(sec => {
          if (sec === "personal" && data.personal.summary) return (
            <View key={sec} style={{ marginBottom: 15 }}>
              <View wrap={false} minPresenceAhead={60}>
                <View style={{ width: 30, height: 1, backgroundColor: '#d1d5db', marginBottom: 6 }}></View>
                <Text style={{ fontSize: 14, color: pColor, fontFamily: 'Times-Bold', marginBottom: 6 }}>Summary</Text>
              </View>
              <Text style={{ fontSize: 10, color: '#6b7280', lineHeight: 1.5 }}>{data.personal.summary}</Text>
            </View>
          );

          if (sec === "skills" && data.skills.length > 0) return (
            <View key={sec} style={{ marginBottom: 15 }}>
              <View wrap={false} minPresenceAhead={60}>
                <View style={{ width: 30, height: 1, backgroundColor: '#d1d5db', marginBottom: 6 }}></View>
                <Text style={{ fontSize: 14, color: pColor, fontFamily: 'Times-Bold', marginBottom: 6 }}>Skills</Text>
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', rowGap: 4, columnGap: 16 }}>
                {data.skills.flatMap(s => s.skills.split(',')).map((skill, i) => (
                  <Text key={i} style={{ fontSize: 10, color: '#6b7280' }}>• {skill.trim()}</Text>
                ))}
              </View>
            </View>
          );

          if (sec === "experience" && data.experience.length > 0) return (
            <View key={sec} style={{ marginBottom: 15 }}>
              <View wrap={false} minPresenceAhead={60}>
                <View style={{ width: 30, height: 1, backgroundColor: '#d1d5db', marginBottom: 6 }}></View>
                <Text style={{ fontSize: 14, color: pColor, fontFamily: 'Times-Bold', marginBottom: 6 }}>Experience</Text>
              </View>
              {data.experience.map(item => (
                <View key={item.id} style={{ marginBottom: 12 }}>
                  <View wrap={false} minPresenceAhead={40}>
                    <Text style={{ fontFamily: 'Times-Bold', fontSize: 11, color: '#374151', textTransform: 'uppercase' }}>
                      {item.title} <Text style={{ fontFamily: 'Times-Roman', color: '#9ca3af', textTransform: 'none' }}>| {item.dateStart} {item.dateStart && item.dateEnd ? "-" : ""} {item.dateEnd}</Text>
                    </Text>
                    <Text style={{ fontFamily: 'Times-Bold', fontSize: 10, color: '#6b7280', marginBottom: 4 }}>{item.subtitle} - {item.location}</Text>
                  </View>
                  <View style={{ fontSize: 10, color: '#6b7280', paddingLeft: 10, lineHeight: 1.4 }}>
                    {formatBullets(item.description)}
                  </View>
                </View>
              ))}
            </View>
          );

          if (sec === "education" && data.education.length > 0) return (
            <View key={sec} style={{ marginBottom: 15 }}>
              <View wrap={false} minPresenceAhead={60}>
                <View style={{ width: 30, height: 1, backgroundColor: '#d1d5db', marginBottom: 6 }}></View>
                <Text style={{ fontSize: 14, color: pColor, fontFamily: 'Times-Bold', marginBottom: 6 }}>Education and Training</Text>
              </View>
              {data.education.map(item => (
                <View key={item.id} style={{ marginBottom: 12 }}>
                  <View wrap={false} minPresenceAhead={40}>
                    <Text style={{ fontFamily: 'Times-Bold', fontSize: 11, color: '#374151' }}>
                      {item.subtitle} - {item.location} <Text style={{ fontFamily: 'Times-Roman', color: '#9ca3af' }}>| {item.title}</Text>
                    </Text>
                    <Text style={{ fontSize: 10, color: '#9ca3af' }}>{item.dateEnd}</Text>
                  </View>
                  <View style={{ fontSize: 10, color: '#6b7280', paddingLeft: 10, lineHeight: 1.4 }}>
                    {formatBullets(item.description)}
                  </View>
                </View>
              ))}
            </View>
          );

          if (sec === "projects" && data.projects.length > 0) return (
            <View key={sec} style={{ marginBottom: 15 }}>
              <View wrap={false} minPresenceAhead={60}>
                <View style={{ width: 30, height: 1, backgroundColor: '#d1d5db', marginBottom: 6 }}></View>
                <Text style={{ fontSize: 14, color: pColor, fontFamily: 'Times-Bold', marginBottom: 6 }}>Projects</Text>
              </View>
              {data.projects.map(item => (
                <View key={item.id} style={{ marginBottom: 12 }}>
                  <View wrap={false} minPresenceAhead={40}>
                    <Text style={{ fontFamily: 'Times-Bold', fontSize: 11, color: '#374151' }}>
                      {item.title} <Text style={{ fontFamily: 'Times-Roman', color: '#9ca3af' }}>| {item.dateStart} {item.dateStart && item.dateEnd ? "-" : ""} {item.dateEnd}</Text>
                    </Text>
                    <Text style={{ fontFamily: 'Times-Bold', fontSize: 10, color: '#6b7280', marginBottom: 4 }}>{item.subtitle} - {item.location}</Text>
                  </View>
                  <View style={{ fontSize: 10, color: '#6b7280', paddingLeft: 10, lineHeight: 1.4 }}>
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

export const ResumeDocument = ({ data }: { data: ResumeData }) => {
  return (
    <Document key={data.settings.sectionOrder.join(',')} title={`${data.personal.fullName.replace(/\s+/g, '_')}_Resume`} author={data.personal.fullName}>
      {data.settings.template === "executive" && <TemplateExecutivePDF data={data} />}
      {data.settings.template === "creative" && <TemplateCreativePDF data={data} />}
      {data.settings.template === "classic" && <TemplateClassicPDF data={data} />}
      {data.settings.template === "elegant" && <TemplateElegantPDF data={data} />}
    </Document>
  );
};
