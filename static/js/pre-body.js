
var aliases = '0xnil.com,www.0xnil.com,oxnil.org,www.oxnil.org,oxnil.com,www.oxnil.com'.split(',')

if (~aliases.indexOf(location.hostname)) {
    location = location.href.replace(/http:/,'https:').replace(RegExp(location.hostname), '0xnil.org')
} else if (location.hostname === '0xnil.org' && location.protocol === 'http:') {
    location = location.href.replace(/http:/,'https:')
}
