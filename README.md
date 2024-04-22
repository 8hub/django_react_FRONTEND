- [1. App start](#1-app-start)
- [2. Conenction to Django API](#2-conenction-to-django-api)
  - [2.1. `axios` library](#21-axios-library)
- [3. React annotations](#3-react-annotations)
- [4. Django API annotations](#4-django-api-annotations)


## 1. App start

1. Start the Django server
```bash
python manage.py runserver
```
2. Start the React server
```bash
npm start
```


## 2. Conenction to Django API

### 2.1. `axios` library

`PUT`, `POST`, `DELETE` and `GET` requests are made to Django API using `axios` library.
```jsx
const editStudent =  e => {
      e.preventDefault();
        axios.put(`${API_URL}${formData.pk}/`, formData) // PUT request
        .then(() => {
          refreshState();
          toggle();
        })
        .catch (error => {
          console.log('Error editing student: ', error);
        });
    };
```


## 3. React annotations

Class components are converted to functional components using hooks and `useState` and `useEffect` hooks are used to manage the state of the components. This way the code is more readable and easier to maintain.\
Additionally the axios requests are handles with `try` and `catch` blocks to handle errors - in case in Django API the `serializer.is_valid()` method returns `False`.

Initial approach:
```jsx
// Class component using 'this' keyword to access the props and state
class NewStudentForm extends React.Component {
  state = {
    pk: 0,
    name: "",
    email: "",
    document: "",
    phone: ""
  };

  componentDidMount() {
    if (this.props.student) {
      const { pk, name, document, email, phone } = this.props.student;
      this.setState({ pk, name, document, email, phone });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createStudent = e => {
    e.preventDefault();
    axios.post(API_URL, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  editStudent = e => {
    e.preventDefault();
    axios.put(API_URL + this.state.pk, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    return (
      <Form onSubmit={this.props.student ? this.editStudent : this.createStudent}>
        <FormGroup>
          <Label for="name">Name:</Label>
          <Input
            type="text"
            name="name"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.name)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email:</Label>
          <Input
            type="email"
            name="email"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.email)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="document">Document:</Label>
          <Input
            type="text"
            name="document"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.document)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="phone">Phone:</Label>
          <Input
            type="text"
            name="phone"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.phone)}
          />
        </FormGroup>
        <Button>Send</Button>
      </Form>
    );
  }
}
```

Final approach:
```jsx
// Functional component using 'useState' and 'useEffect' hooks to manage the state.
// This way the code is more readable and easier to maintain.
const NewStudentForm = ({refreshState, toggle, student }) => {
  const [formData, setFormData] = useState({
    pk: 0,
    name: '',
    email: '',
    document: '',
    phone: ''
  });

  useEffect(() => {
    if (student) {
      setFormData({
        pk:       student.pk,
        name:     student.name, 
        email:    student.email, 
        document: student.document, 
        phone:    student.phone
      });
    };
  }, [student]);
  
  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const createStudent = e => {
    e.preventDefault();
    axios.post(API_URL, formData)
    .then(() => {
      refreshState();
      toggle();
    })
    .catch (error => { 
      console.log('Error creating student: ', error);
    });
  };

  const editStudent = e => {
    e.preventDefault();
    axios.put(`${API_URL}${formData.pk}/`, formData)
    .then(() => {
      refreshState();
      toggle();
    })
    .catch (error => {
      console.log('Error editing student: ', error);
    });
  };

  const defaultIfEmpty = (value) => (value === "" ? "" : value);
  
  return (
    <Form onSubmit={student ? editStudent : createStudent}>
      <FormGroup>
        <Label for="name">Name:</Label>
        <Input
          type="text"
          name="name"
          onChange={onChange}
          value={defaultIfEmpty(formData.name)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email:</Label>
        <Input
          type="email"
          name="email"
          onChange={onChange}
          value={defaultIfEmpty(formData.email)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="document">Document:</Label>
        <Input
          type="text"
          name="document"
          onChange={onChange}
          value={defaultIfEmpty(formData.document)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="phone">Phone:</Label>
        <Input
          type="text"
          name="phone"
          onChange={onChange}
          value={defaultIfEmpty(formData.phone)}
        />
      </FormGroup>
      <Button>Send</Button>
    </Form>
  );
};
```

## 4. Django API annotations

Instead of function based views, class based views are used to manage the API endpoints. This way the code is more readable and easier to maintain.

Initial approach:
```python
# Function based view to manage the API endpoints
@api_view(['GET', 'POST'])
def students_list(request):
    if request.method == 'GET':
        data = Student.objects.all()

        serializer = StudentSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

Final approach:
```python
#  Simplified class based view to manage the API endpoints
#  ListCreateAPIView handles the GET and POST requests
class StudentList(ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
```