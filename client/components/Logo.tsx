import { Icon, useColorModeValue } from '@chakra-ui/react'

export const Logo = () => {
  const color = useColorModeValue('gray.800', 'white')
  return (
    <Icon color={color} viewBox='0 0 158 54' width='158px' height='54px'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M15.3484 0.533463C8.19948 2.48015 2.38599 8.4446 0.504082 15.7628C-0.175217 18.4051 -0.167009 22.9931 0.522999 25.9576C1.77701 31.3461 5.94347 36.5266 11.2176 39.255C12.7882 40.0675 14.4331 40.8427 14.8725 40.9776L15.6718 41.2234L15.7649 25.7432L15.8581 10.2629L19.4563 10.281C22.639 10.2969 23.2872 10.4141 25.0659 11.2956C31.6401 14.5533 33.0962 23.1225 27.9527 28.2865C26.2896 29.9562 24.4709 30.9505 22.4947 31.2705L21.0341 31.5073V42.9228C21.0341 49.2015 21.1626 54.1839 21.3196 53.9948C21.4767 53.806 22.2399 52.8388 23.0152 51.846C23.7909 50.8531 26.0883 48.0871 28.1212 45.6993C37.8645 34.2545 41.3809 27.6476 41.3809 20.7861C41.3809 11.3643 34.886 2.89885 25.8231 0.507789C23.2169 -0.179917 17.9196 -0.166898 15.3484 0.533463ZM90.2848 3.93547C89.423 4.8083 89.3459 6.70364 90.1266 7.8321C90.5718 8.47642 91.0287 8.63587 92.4265 8.63587C94.4505 8.63587 95.2822 7.8227 95.2822 5.84347C95.2822 4.19182 94.2192 3.21233 92.4265 3.21233C91.4745 3.21233 90.7606 3.4535 90.2848 3.93547ZM138.118 3.93547C137.256 4.8083 137.179 6.70364 137.96 7.8321C138.405 8.47642 138.862 8.63587 140.259 8.63587C142.283 8.63587 143.115 7.8227 143.115 5.84347C143.115 4.19182 142.052 3.21233 140.259 3.21233C139.307 3.21233 138.594 3.4535 138.118 3.93547ZM122.054 6.06222L120.805 6.28567L120.699 8.72627L120.594 11.1669H119.004H117.414V12.9747V14.7826H119.02H120.627V20.9408C120.627 27.4324 120.877 28.7753 122.336 30.0914C123.351 31.0069 125.763 31.4943 127.923 31.2213L129.729 30.9932L129.607 29.2385L129.485 27.4838L128.056 27.5037C125.594 27.538 125.446 27.1493 125.446 20.6458V14.9633L127.409 14.7826L129.372 14.6018L129.406 12.8843L129.441 11.1669H127.354H125.267V8.45509V5.74332L124.285 5.79105C123.746 5.81708 122.742 5.93929 122.054 6.06222ZM150.325 6.06222L149.076 6.28567L148.97 8.72627L148.865 11.1669H147.275H145.685V12.9747V14.7826H147.291H148.897V20.9408C148.897 27.4324 149.148 28.7753 150.607 30.0914C151.622 31.0069 154.033 31.4943 156.194 31.2213L158 30.9932L157.878 29.2385L157.756 27.4838L156.327 27.5037C153.865 27.538 153.716 27.1493 153.716 20.6458V14.9633L155.68 14.7826L157.643 14.6018L157.677 12.8843L157.712 11.1669H155.625H153.538V8.45509V5.74332L152.556 5.79105C152.016 5.81708 151.012 5.93929 150.325 6.06222ZM54.5885 11.1582C53.705 11.3307 52.3397 11.7038 51.5543 11.9876C50.2514 12.4584 50.1054 12.6428 49.8852 14.0949C49.7524 14.9702 49.6321 20.7712 49.6175 26.9855L49.591 38.2846H52.0898H54.5885V34.7235V31.162L58.08 31.1787C61.1366 31.1928 61.7656 31.085 63.1349 30.3105C65.1635 29.1633 65.972 28.0109 66.5778 25.4033C67.5009 21.4282 66.9441 15.8933 65.4045 13.7434C63.8367 11.5537 58.7693 10.3428 54.5885 11.1582ZM76.1847 10.9622C75.9884 11.0421 75.222 11.2102 74.4817 11.3357C72.689 11.6398 70.846 13.3435 70.0503 15.4323C69.2468 17.541 69.149 24.3287 69.8908 26.4743C70.5508 28.383 72.2153 30.1999 73.7842 30.7245C75.3005 31.2314 79.4895 31.3453 81.4714 30.9335C83.4736 30.5173 85.5243 28.4752 86.1775 26.2468C86.8693 23.8872 86.8758 18.3545 86.1893 16.0133C85.621 14.0746 83.984 12.1865 82.3202 11.5512C81.2575 11.1452 76.7887 10.7163 76.1847 10.9622ZM103.902 11.1542C102.851 11.3216 101.307 11.723 100.471 12.0466C98.9568 12.6323 98.9504 12.6424 98.723 14.8462C98.5977 16.0629 98.4949 20.2068 98.4949 24.0557V31.0532H100.994H103.492V23.1149V15.177L104.764 14.9351C106.573 14.5916 109.175 14.9604 109.865 15.6583C110.365 16.1638 110.47 17.362 110.563 23.6529L110.672 31.0532H112.991H115.31L115.201 22.7628C115.101 15.0516 115.042 14.4007 114.357 13.4523C113.951 12.8912 113.056 12.1478 112.367 11.8003C110.88 11.0497 106.608 10.7236 103.902 11.1542ZM89.9278 21.11V31.0532H92.4265H94.9253V21.11V11.1669H92.4265H89.9278V21.11ZM137.761 21.11V31.0532H140.259H142.758V21.11V11.1669H140.259H137.761V21.11ZM60.0458 15.1749C61.6078 15.8958 62.0847 17.2803 62.0847 21.0934C62.0847 26.2288 61.162 27.4375 57.2418 27.4375C54.4814 27.4375 54.5885 27.6928 54.5885 21.1013C54.5885 16.722 54.7035 15.1575 55.0347 15.0219C55.8714 14.6802 59.193 14.7815 60.0458 15.1749ZM80.0703 15.1911C81.3896 15.7997 81.8961 17.4423 81.8961 21.11C81.8961 26.0715 81.0105 27.4375 77.7943 27.4375C76.8383 27.4375 76.0898 27.1645 75.4016 26.565C74.4021 25.694 74.3999 25.6824 74.3999 21.11C74.3999 16.5376 74.4021 16.526 75.4016 15.655C76.5096 14.6896 78.5457 14.4875 80.0703 15.1911Z'
        fill='currentColor'
      />
    </Icon>
  )
}
