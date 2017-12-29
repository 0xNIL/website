var aliases = '0xnil.com,www.0xnil.com,www.0xnil.org,oxnil.org,www.oxnil.org,oxnil.com,www.oxnil.com'.split(',')

var relocation

if (~aliases.indexOf(location.hostname)) {
    relocation = location.href//.replace(/https:/, 'http:')
        .replace(RegExp(location.hostname), '0xnil.org')
}
if (//location.hostname === '0xnil.org' &&
    location.protocol === 'https:') {
    relocation = (relocation || location).href.replace(/https:/, 'http:')
}

if (relocation) {
    location = relocation
}

