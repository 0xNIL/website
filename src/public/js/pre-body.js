
var aliases = '0xnil.com,www.0xnil.com,www.0xnil.org,oxnil.org,www.oxnil.org,oxnil.com,www.oxnil.com'.split(',')

if (~aliases.indexOf(location.hostname)) {
  location = location.href.replace(RegExp(location.hostname), '0xnil.org')
}
