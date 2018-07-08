import axios from 'axios';

// axios.create({
//    headers: { 'Content-Type': 'application/json;charset=utf-8' }
// });

const base = '';

let host = 'http://121.40.241.35:3000';

export const getUserLoginInfo = params => { 
console.log('请求了')
  return axios.post('api/login', params).then(res => res.data)
};


//课程创建
export const createCourseSubject = params => { 
  return axios.post('/course/subject', params).then(res => res.data)
};
//课程修改
export const putCourseSubject = params => { 
  return axios.put(`/course/subject`, params).then(res => res.data)
};
//课程删除
export const deleteCourseSubject = params => { 
  return axios.delete(`/course/subject`, {data: params}).then(res => res.data)
};
//课程详情
export const getCourseSubjectDetail = params => { 
  return axios.get(`/course/subject`, { params: params }).then(res => res.data);
};
//课程列表
export const getCourseSubjectPage = params => { 
  return axios.get(`/course/subject/page`, { params: params }).then(res => res.data);
};


//课程分类

/**
 * getCourseSectionPage 获取课程列表
 * @param  {pageNum} params [description]
 * @return {[type]}        [description]
 */
export const getCourseSectionPage = params => { 
  return axios.get(`/course/category/page`, { params: params }).then(res => res.data);
};
/**
 * addCourseSection 新增课程分类
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export const addCourseSection = params => { 
  return axios.post(`/course/category`, params).then(res => res.data)
};

//修改课程分分类
export const putCourseSection = params => { 
  return axios.put(`/course/category`, params).then(res => res.data)
};

//删除课程分类
export const deleteCourseCategory = params => { 
  return axios.delete(`/course/category`, {data: params}).then(res => res.data)
};



//课件
//添加章
export const createCourseChapter = params => { 
  return axios.post(`/course/chapter`, params).then(res => res.data)
};

//修改章
export const putCourseChapter = params => { 
  return axios.put(`/course/chapter`, params).then(res => res.data)
};

//删除章
export const deleteCourseChapter = params => { 
  return axios.delete(`/course/chapter`, {data: params}).then(res => res.data)
};

//章列表
export const getCourseChapterList = params => { 
  return axios.post(`/course/chapter/list`, params).then(res => res.data)
};

