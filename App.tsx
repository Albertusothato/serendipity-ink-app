import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, ScrollView } from 'react-native';


interface Course {
  id: string;
  title: string;
  description: string;
  benefits: string;
  jobs: string;
}

export default function App() {
  const [name, setName] = useState<string>('');
  const [profileCreated, setProfileCreated] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [question, setQuestion] = useState<string>('');
  const [progress, setProgress] = useState<string>('');

  const courses: Course[] = [
    {
      id: '1',
      title: 'Basic Life Skills',
      description: 'This course covers essential life skills such as personal hygiene, cooking, and time management. Participants will learn practical techniques aimed at improving daily living and promoting independence. This foundation enables individuals to navigate daily tasks confidently and effectively.',
      benefits: 'Improved self-sufficiency and daily management skills.',
      jobs: 'Roles in personal assistance, community services, and caregiving.',
    },
    {
      id: '2',
      title: 'Effective Communication',
      description: 'In this course, learners will explore the fundamentals of effective communication, including verbal and non-verbal techniques. Emphasis will be placed on active listening, empathy, and assertiveness. This course equips participants with the skills needed to express themselves clearly and foster strong interpersonal relationships.',
      benefits: 'Enhanced interpersonal relationships and workplace effectiveness.',
      jobs: 'Customer service, teaching, management roles.',
    },
    {
      id: '3',
      title: 'Financial Management',
      description: 'This course introduces the principles of financial literacy, focusing on budgeting, saving, and responsible spending. Participants will gain insights into managing personal finances and making informed financial decisions that align with their future goals.',
      benefits: 'Greater control over personal finances and improved savings.',
      jobs: 'Accounting, finance-related positions, and personal budgeting roles.',
    },
    {
      id: '4',
      title: 'Health & Safety',
      description: 'Understanding health and safety is crucial for both personal well-being and workplace environments. This course covers essential practices and regulations that ensure a safe and healthy lifestyle.',
      benefits: 'Increased awareness of health practices and workplace safety.',
      jobs: 'Occupational health and safety officer, safety trainer.',
    },
    {
      id: '5',
      title: 'Childcare Basics',
      description: 'Learn the essential skills for caring for children, including health, safety, and developmental milestones. This course prepares participants for roles that require nurturing and educational skills.',
      benefits: 'Preparedness for childcare roles and understanding child development.',
      jobs: 'Nanny, daycare assistant, early childhood educator.',
    },
    {
      id: '6',
      title: 'Household Management',
      description: 'Develop skills in cleaning, cooking, and managing a household effectively. This course helps participants understand household budgeting, organization, and maintenance tasks.',
      benefits: 'Efficient household management and time-saving techniques.',
      jobs: 'Household manager, personal assistant.',
    },
    {
      id: '7',
      title: 'Digital Literacy',
      description: 'In the digital age, having computer and internet skills is vital. This course covers basic computer usage, internet navigation, and online safety, preparing participants for modern job markets.',
      benefits: 'Enhanced employability and ability to leverage technology.',
      jobs: 'Office assistant, data entry roles, and tech support.',
    },
    {
      id: '8',
      title: 'Gardening and Landscaping',
      description: 'Learn gardening techniques and landscape design principles. This course covers plant care, garden maintenance, and creative landscaping solutions to beautify outdoor spaces.',
      benefits: 'Ability to create and maintain beautiful gardens.',
      jobs: 'Gardener, landscaper, landscape designer.',
    },
  ];

  const createProfile = () => {
    if (name) {
      setProfileCreated(true);
    }
  };

  const selectCourse = (course: Course) => {
    setSelectedCourse(course);
    setProgress('');
    setQuestion('');
  };

  const handleQuestionSubmit = () => {
    if (question.toLowerCase().includes('budgeting') && selectedCourse?.id === '3') {
      setProgress('Great job! You have a solid understanding of financial basics, but consider focusing more on saving strategies.');
    } else {
      setProgress('Keep practicing! Review the steps on budgeting and try again.');
    }
  };

  return (
    <View style={styles.container}>
      {!profileCreated ? (
        <>
          <Text style={styles.header}>Welcome to Serendipity Ink</Text>
          <Text style={styles.subheader}>Empowering Domestic Workers through Education</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
          <Button title="Create Profile" onPress={createProfile} />
        </>
      ) : selectedCourse ? (
        <ScrollView>
          <Text style={styles.courseTitle}>{selectedCourse.title}</Text>
          <Text style={styles.courseDescription}>{selectedCourse.description}</Text>
          <Text style={styles.courseBenefit}>Benefits: {selectedCourse.benefits}</Text>
          <Text style={styles.courseJob}>Job Opportunities: {selectedCourse.jobs}</Text>

          <Text style={styles.stepHeader}>Learning Steps:</Text>
          <Text style={styles.steps}>1. Understand the basics of {selectedCourse.title}.</Text>
          <Text style={styles.steps}>2. Apply the knowledge through practical examples.</Text>
          <Text style={styles.steps}>3. Review how it benefits your personal and professional life.</Text>

          <Text style={styles.questionHeader}>Test Your Knowledge:</Text>
          <TextInput
            style={styles.input}
            placeholder={`What have you learned about ${selectedCourse.title}?`}
            value={question}
            onChangeText={setQuestion}
          />
          <Button title="Submit Answer" onPress={handleQuestionSubmit} />
          {progress && <Text style={styles.progress}>{progress}</Text>}

          <Button title="Go Back to Course List" onPress={() => setSelectedCourse(null)} />
        </ScrollView>
      ) : (
        <>
          <Text style={styles.welcome}>Hello, {name}!</Text>
          <Text style={styles.courseHeader}>Available Courses</Text>
          <FlatList
            data={courses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.courseItem}>
                <Text style={styles.courseTitle}>{item.title}</Text>
                <Button title="More info" onPress={() => selectCourse(item)} />
              </View>
            )}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E1',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF69B4',
    marginBottom: 10,
  },
  subheader: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000000',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  welcome: {
    fontSize: 22,
    color: '#FF69B4',
    marginBottom: 10,
  },
  courseHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  courseItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'hotpink',
  },
  courseTitle: {
    fontSize: 16,
  },
  courseDescription: {
    fontSize: 16,
    marginVertical: 10,
  },
  courseBenefit: {
    fontSize: 14,
    marginVertical: 5,
  },
  courseJob: {
    fontSize: 14,
    marginBottom: 15,
  },
  stepHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  steps: {
    fontSize: 14,
    marginBottom: 5,
  },
  questionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  progress: {
    fontSize: 16,
    color: 'green',
    marginVertical: 10,
  },
});
