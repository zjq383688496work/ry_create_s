import { message } from 'antd'

const common = {}

common.getAccessToken = function () {
	function getQueryString(name) {
		const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
		const r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]); return null;
	}
	let accessToken = sessionStorage.getItem('access_token');
	if (!accessToken) {
		accessToken = getQueryString('access_token');
	}
	accessToken = 'along123456';
	return accessToken;
};


export default class Fetch {
	static remote(url, config, success, failed) {
		var newConfig = Object.assign({}, { method: 'GET' }, config);
		fetch(url, newConfig).then(response => response.json()).then(result => {
			if (result.meta.errno === 0) {
				success && success(result.result)
			} else {
				if (result.msg === '登录已过期,请重新登录!' || result.msg === 'access_token不正确，请退出后重试') console.log('登录已过期,请重新登录!')
				throw new Error(result.meta.msg);
			}
		}).catch(error => {
			message.error(error.message)
			failed && failed(error)
		})
	}

	static get(url, config) {
		let id = window.uif.userInfo.id || '1'
		if (id) url += ((/\?/.test(url)? '&': '?') + 'userId='+id)
		return new Promise((resolve, reject) => {
			const newConfig = Object.assign({}, {
				method: 'GET'
			}, config)
			Fetch.remote(url, newConfig, resolve, reject);
		});
	}

	static postLogin(url, config = {}) {
		return new Promise((resolve, reject) => {
			Fetch.remote(url, {
				method: 'POST',
				body: JSON.stringify(config),
				headers: {
					'Content-Type': 'application/json;charset=UTF-8'
				},
				credentials: 'include'
			}, resolve, reject)
		})
	}
	static post(url, config = {}) {
		var id = window.uif.userInfo.id || '1'
		if (id) config.userId = id
		return new Promise((resolve, reject) => {
			Fetch.remote(url, {
				method: 'POST',
				body: new URLSearchParams(config),
			}, resolve, reject)
		})
	}

	static postFile(url, config) {
		return new Promise((resolve, reject) => {
			const newConfig = Object.assign({}, {
				method: 'POST',
				headers: { Authorization: `Bearer ${common.getAccessToken()}` }
			}, config);
			Fetch.remote(url, newConfig, resolve, reject);
		});
	}

	static del(url, config) {
		return new Promise((resolve, reject) => {
			const newConfig = Object.assign({}, {
				method: 'DELETE',
				headers: { Authorization: `Bearer ${common.getAccessToken()}` }
			}, config);
			Fetch.remote(url, newConfig, resolve, reject);
		});
	}

	static postJSON(url, config = {}) {
		return new Promise((resolve, reject) => {
			Fetch.remote(url, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(config),
				credentials: 'include'
			}, resolve, reject);
		});
	}
	static postJSON_C(url, config = {}) {
		return new Promise((resolve, reject) => {
			Fetch.remote(url, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(config)
			}, resolve, reject);
		});
	}

	static createCrop(config = {}) {
		var host = ({
			dev: 'localhost:4090',
			qa: '186.rongyi.com:3000',
			dist: 'manage.preview.rongyi.com'
		})[ENV] || 'manage.w.rongyi.com'

		var API = `http://${host}/api/screen/createV2`
		return new Promise((resolve, reject) => {
			Fetch.remote(API, {
				method: 'POST',
				body: new URLSearchParams(config),
			}, resolve, reject)
		})
	}

	//图片上传 
	static postJSONIMG(url, data) {
		return new Promise((resolve, reject) => {
			const newConfig = Object.assign({}, {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
				body: new URLSearchParams(data), 
				credentials: 'include'
			})
			Fetch.remote(url, newConfig, resolve, reject);
		});
	}
	//音乐上传 
	static postJSONAUDIO(url, data) {
		return new Promise((resolve, reject) => {
			const newConfig = Object.assign({}, {
				method: 'POST',
				body: data, 
				credentials: 'include'
			})
			fetch(url, newConfig).then(response => response.json()).then(result => {
				resolve(result)
			}) 
		});
	}
	//视频上传
	static postVIDEO(url,data,mallId) {
		return new Promise((resolve, reject) => {
			const newConfig = mallId ? Object.assign({}, {
				method: 'POST',
				body:data,
				headers: { mallId }
			}) : Object.assign({}, {
				method: 'POST',
				body:data
			});
			fetch(url, newConfig).then(response => response.json()).then(result => {
				resolve(result)
			}) 
		});
	}
	static putJSON(url, data) {
		return new Promise((resolve, reject) => {
			const newConfig = Object.assign({}, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${common.getAccessToken()}` },
				body: JSON.stringify(data)
			});
			Fetch.remote(url, newConfig, resolve, reject);
		});
	}
}
